import pytesseract
from PIL import Image
import re
import cv2
import numpy as np
import os
from datetime import datetime

def preprocess_image(image_path):
    """Prétraite l'image pour améliorer la qualité de l'OCR"""
    # Charger l'image
    img = cv2.imread(image_path)
    
    # Convertir en niveaux de gris
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Appliquer un filtre gaussien pour réduire le bruit
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Appliquer un seuillage adaptatif
    thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                  cv2.THRESH_BINARY, 11, 2)
    
    # Sauvegarder l'image prétraitée
    processed_path = f"{os.path.splitext(image_path)[0]}_processed.jpg"
    cv2.imwrite(processed_path, thresh)
    
    return processed_path

def detect_id_type(text):
    """Détecte le type de pièce d'identité basé sur le texte extrait"""
    text_lower = text.lower()
    
    if "carte nationale d'identité" in text_lower or "cni" in text_lower:
        return "CNI"
    elif "passeport" in text_lower:
        return "PASSPORT"
    elif "permis de conduire" in text_lower:
        return "PERMIS"
    else:
        return "INCONNU"

def validate_date(date_str):
    """Valide le format de la date (JJ/MM/AAAA)"""
    if not date_str:
        return False
    
    try:
        datetime.strptime(date_str, "%d/%m/%Y")
        return True
    except ValueError:
        return False

def validate_number(number_str, id_type):
    """Valide le format du numéro selon le type de document"""
    if not number_str:
        return False
    
    if id_type == "CNI":
        # Format CNI française (12 chiffres généralement)
        return bool(re.match(r'^\d{10,12}$', number_str))
    elif id_type == "PASSPORT":
        # Format passeport (2 lettres suivies de 7 chiffres pour la France)
        return bool(re.match(r'^[A-Z0-9]{7,9}$', number_str))
    elif id_type == "PERMIS":
        # Format permis de conduire
        return bool(re.match(r'^[A-Z0-9]{9,12}$', number_str))
    else:
        # Validation générique: au moins 6 caractères alphanumériques
        return bool(re.match(r'^[A-Z0-9]{6,}$', number_str))

def extraire_info_piece(image_path):
    """Extrait les informations d'une pièce d'identité"""
    # Prétraitement de l'image
    processed_path = preprocess_image(image_path)
    
    # Extraction du texte avec tesseract (utilisation des langues française et anglaise)
    text = pytesseract.image_to_string(Image.open(processed_path), lang='eng+fra')
    
    # Détection du type de document
    type_piece = detect_id_type(text)
    
    # Extraction des informations avec des expressions régulières
    numero = re.search(r'(?:N°|No|Numéro)[:\s]*([A-Z0-9]{6,})', text)
    nom = re.search(r'(?:NOM|Name)[:\s]*([A-Z]+)', text, re.IGNORECASE)
    prenoms = re.search(r'(?:PRENOM[S]?|Given name)[:\s]*([A-Z ]+)', text, re.IGNORECASE)
    
    # Recherche de dates (format JJ/MM/AAAA ou JJ MM AAAA)
    dates = re.findall(r'(\d{2}[/\s]\d{2}[/\s]\d{4})', text)
    
    # Analyse des dates trouvées
    date_naissance = ""
    date_expiration = ""
    
    if dates:
        # Cherche les indices contextuels pour déterminer quelle date est laquelle
        if len(dates) >= 2:
            # Si on a au moins 2 dates, on peut supposer que la première est la date de naissance
            # et la dernière est la date d'expiration (logique courante sur les pièces d'identité)
            date_naissance = dates[0].replace(' ', '/')
            date_expiration = dates[-1].replace(' ', '/')
        elif len(dates) == 1:
            # Si une seule date, cherchons des indices contextuels
            if "naissance" in text.lower() or "birth" in text.lower():
                date_naissance = dates[0].replace(' ', '/')
            elif "expiration" in text.lower() or "exp" in text.lower() or "valable" in text.lower():
                date_expiration = dates[0].replace(' ', '/')
    
    # Extraction du résultat
    resultats = {
        "type_piece": type_piece,
        "numero": numero.group(1) if numero else "",
        "nom": nom.group(1) if nom else "",
        "prenoms": prenoms.group(1).strip().title() if prenoms else "",
        "date_naissance": date_naissance,
        "date_expiration": date_expiration
    }
    
    # Validation des données extraites
    validations = {
        "numero_valide": validate_number(resultats["numero"], type_piece),
        "date_naissance_valide": validate_date(resultats["date_naissance"]),
        "date_expiration_valide": validate_date(resultats["date_expiration"])
    }
    
    return resultats, validations
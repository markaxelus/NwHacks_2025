import os
import fitz
from PIL import Image


'''
    We want to process each page of the input_doc
        1. Extract text using pdfminer
        2. Extract images using PyMuPDF
        3. Implement solutions for scanned pdfs with tessaract

''' 
def extract_text(input_doc, output_dir) -> None:
    try:
        with open(input_doc, "rb") as file:
            pdf = fitz.open(input_doc)
            for page_number in range(len(pdf)):
                page = pdf[page_number]
                text = page.get_text("text")
                text_file_path = os.path.join(output_dir, f"page_{page_number+1}_text.txt")
                with open(text_file_path, "w", encoding='utf-8') as text_file:
                    text_file.write(text)
                print(f"Extracted text from the pdf saved to: {text_file_path}")
            pdf.close()
    except Exception as e:
        print(f"Error extracting text from the pdf: {e}")


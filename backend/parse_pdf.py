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

def extract_images(input_doc, output_dir) -> None:
    try:
        input_doc = fitz.open(input_doc)

        for page in range(len(input_doc)):
            cur_page = input_doc[page]
            images = cur_page.get_images(full=True)
            for img in images:
                xref = image[0]
                base_image = input_doc.extract_image(xref)
                image_bytes = base_image["image"]
                image = Image.open(image_bytes)
                image_path = os.path.join(output_dir, f"page_{page+1}_image_{xref}.png")
                image.save(image_path)
                print(f"Extracted image from the pdf saved to: {image_path}")
        input_doc.close()
    
    except Exception as e:
        print(f"Error extracting images from the pdf: {e}")



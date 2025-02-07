import os
import fitz
from PIL import Image
from pdfminer.high_level import extract_text


'''
    We want to process each page of the input_doc
        1. Extract text using pdfminer
        2. Extract images using PyMuPDF
        3. Implement solutions for scanned pdfs with tessaract

''' 
def extract_text_from_pdf(input_file:str , output_dir_text:str) -> None:
    try: 
        # Open the input file with pdfminer
        text_doc = extract_text(input_file)
        text_file_path = os.path.join(output_dir_text, "extracted_text.txt")
        with open(text_file_path, "w", encoding='utf-8') as text_file:
            text_file.write(text_doc)
        print(f"PDFMiner extracted text from the pdf saved to: {text_file_path}")
        
    
    except Exception as e:
        print(f"PDFMiner failed in extracting text from the pdf: {e}")
def extract_images(input_file:str , output_image:str) -> None:      

    try:
        # Open the inputfile with fitz
        input_doc = fitz.open(input_file)

        for page in range(len(input_doc)):
            cur_page = input_doc[page]
            # Returns metadata of the images
            images = cur_page.get_images(full=True)
            for img_index, img in enumerate(images, start=1):
                xref = img[0]
                save_image(input_doc, xref, output_image, page + 1, img_index)
        input_doc.close()
        print(f"Extracted images from the pdf saved to: {output_image}")

    except Exception as e:
        print(f"Extracting images failed from the pdf: {e}")

def save_image(doc: fitz.Document, xref:int, output_dir_image:str, page_number:int, img_index:int) -> None:
    """
    """

    base_img = doc.extract_image(xref)
    img_bytes = base_img["image"]
    img_ext = base_img["ext"]

    # Define path
    image_path = os.path.join(output_dir_image, f"page_{page_number}_image_{img_index}.{img_ext}")

    # Save image
    try:
        with open(image_path, "wb") as image_file:
            image_file.write(img_bytes)
        
        print(f"Saved image successfully: {image_path}")
    
    except Exception as e:
        print(f"Failed to save image: {e}")

# For testing purposes, later not needed when integrated with FastAPI
def main():
    os.makedirs("output_txt", exist_ok=True)
    os.makedirs("output_img", exist_ok=True)

    extract_text_from_pdf("sample.pdf", "output_txt")
    extract_images("sample.pdf", "output_img")

if __name__ == "__main__":
    main()
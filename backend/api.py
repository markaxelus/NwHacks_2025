import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parse_pdf import extract_text, extract_images

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
    allow_credentials=True
)

UPLOAD_DIR = "uploads"
TEXT_OUTPUT_DIR = "text_output"
IMAGE_OUTPUT_DIR = "image_output"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    
"""   try:
        extract_text(file_path, TEXT_OUTPUT_DIR)
        extract_images(file_path, IMAGE_OUTPUT_DIR)

        # Get extracted files
        text_files = os.listdir(TEXT_OUTPUT_DIR)
        image_files = os.listdir(IMAGE_OUTPUT_DIR)

        return {
            "text_files": text_files,
            "image_files": image_files
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}") """
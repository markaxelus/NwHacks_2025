import os 
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parse_pdf import extract_text, extract_images

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOADS = 'uploads'
OUTPUT_TXT = 'output_txt'
OUTPUT_IMG = 'output_img'

os.makedirs("UPLOADS", exist_ok=True)
os.makedirs("OUTPUT_TXT", exist_ok=True)
os.makedirs("OUTPUT_IMG", exist_ok=True)

# Config POST later when Frontend routesare setup
@app.post("/")
async def process_pdf(input_file: UploadFile = File(...)):
    file_path = f"{UPLOADS}/{input_file.filename}"
    with open(file_path, "wb") as f:
        f.write(input_file.file.read())

    try:
        extract_text(file_path, OUTPUT_TXT)
        extract_images(file_path, OUTPUT_IMG)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the file: {e}")
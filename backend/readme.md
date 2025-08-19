COMO INICIAR CONDA:

-POSICIONARSE EN LA CARPETA ADECUADA, EN ESTE CASO /APP1/backend

- conda activate base
-conda create -n fastapi python=3.10
-conda activate fastapi
-pip install -r requirements.txt
-uvicorn app.main:app --reload

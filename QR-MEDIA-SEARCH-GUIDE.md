# PlantMaster Pro v1.6 — QR, Media and Search

## QR camera

Use the deployed HTTPS/PWA address. Open **QR Scanner & Files → QR Scanner**, allow camera permission, and use the rear camera. QR images can also be selected from storage.

## Adding people by QR

Open **Create QR Code**, select **Person / Employee**, enter the person's name, ID, role, shift and contact, then generate/download the QR. When an unregistered person's QR is scanned, PlantMaster asks whether to add them to the roster. A PIN is not stored in the QR; the Owner assigns it separately.

## Equipment QR codes

QR records support machines, pumps, motors, compressors, dryers, fans, conditioners, AHU, hoists, tools, images, documents and custom items. Existing assets/tools open their linked record when scanned. Unknown equipment can be registered after confirmation.

## Images and documents

Files save offline first in IndexedDB. Run the SQL in `MEDIA-SETUP.md` once to synchronize original files across devices using Supabase Storage.

- Images: preview and optional OCR
- PDF: preview and extracted text
- DOCX: extracted text
- TXT/CSV/JSON/Markdown/logs: direct reading
- XLS/XLSX: extracted sheet data

Media notes are searchable and a work order can be created from any uploaded file.

## Global search

The top search field searches assets, people, work orders, assignments, spares, tools, logs/history, extracted document text, image OCR text, media notes and QR registry items.

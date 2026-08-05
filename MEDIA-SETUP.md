# PlantMaster Pro media storage setup

Images and documents always save offline first in IndexedDB. To synchronize original files across devices, run this once in the Supabase SQL Editor for project `hbagiydystgdtjekbauh`:

```sql
insert into storage.buckets (id, name, public, file_size_limit)
values ('plantmaster-files', 'plantmaster-files', false, 26214400)
on conflict (id) do update
set file_size_limit = excluded.file_size_limit;

create policy "plantmaster media read"
on storage.objects for select to anon
using (bucket_id = 'plantmaster-files');

create policy "plantmaster media insert"
on storage.objects for insert to anon
with check (
  bucket_id = 'plantmaster-files'
  and (storage.foldername(name))[1] = 'plantmaster-pro-main'
);

create policy "plantmaster media update"
on storage.objects for update to anon
using (
  bucket_id = 'plantmaster-files'
  and (storage.foldername(name))[1] = 'plantmaster-pro-main'
)
with check (
  bucket_id = 'plantmaster-files'
  and (storage.foldername(name))[1] = 'plantmaster-pro-main'
);
```

Do not place a Supabase service-role key in `index.html`. The app uses the existing publishable key and offline buffering.

Supported reading features:

- Images: preview plus optional OCR text recognition
- PDF: preview and text extraction
- DOCX: text extraction
- TXT, CSV, JSON, Markdown and logs: direct text reading
- XLS/XLSX: sheet text extraction
- Other files: original download and metadata/notes

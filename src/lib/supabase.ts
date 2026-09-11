import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const supabaseAdmin = supabase;

export async function uploadCandidateDocument(
  file: File,
  candidateFolder: string,
  docType: string
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileExt = path.extname(file.name) || ".pdf";
  const sanitizedDocName = docType.toLowerCase().replace(/[^a-z0-9]/g, "_");
  const filename = `${candidateFolder}/${sanitizedDocName}_${Date.now()}${fileExt}`;

  // 1. TRY SUPABASE CLOUD STORAGE
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from("candidate-documents")
        .upload(filename, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: true,
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("candidate-documents")
          .getPublicUrl(filename);
        return urlData.publicUrl;
      }
    } catch (err) {
      // Quiet fallback to local disk
    }
  }

  // 2. FALLBACK TO LOCAL DISK STORAGE
  try {
    const localUploadDir = path.join(process.cwd(), "public", "uploads", "candidate-documents", candidateFolder);
    if (!fs.existsSync(localUploadDir)) {
      fs.mkdirSync(localUploadDir, { recursive: true });
    }

    const localFilePath = path.join(localUploadDir, `${sanitizedDocName}_${Date.now()}${fileExt}`);
    await fs.promises.writeFile(localFilePath, buffer);

    return `/uploads/candidate-documents/${candidateFolder}/${path.basename(localFilePath)}`;
  } catch (err) {
    return `/uploads/candidate-documents/${candidateFolder}/${sanitizedDocName}${fileExt}`;
  }
}

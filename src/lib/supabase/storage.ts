import { createClient } from './client';

export type StorageBucket = 'products' | 'projects' | 'gallery' | 'blogs' | 'documents';

export async function uploadFileToStorage(
  bucket: StorageBucket,
  folderPath: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  try {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown storage upload error';
    return { url: null, error: errorMsg };
  }
}

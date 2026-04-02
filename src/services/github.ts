export interface GitHubUploadParams {
  file: File;
  repoOwner: string;
  repoName: string;
  accessToken: string;
  commitMessage?: string;
}

/**
 * Файлды Base64 форматына өткөрүүчү жардамчы функция
 * (GitHub API файлдарды Base64 форматында кабыл алат)
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // "data:image/png;base64,..." деген саптан base64 бөлүгүн гана кесип алабыз
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('FileReader result is not a string'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * GitHub репозиторийине файл жүктөөчү функция
 */
export const uploadFileToGitHub = async ({
  file,
  repoOwner,
  repoName,
  accessToken,
  commitMessage = 'Upload file via API'
}: GitHubUploadParams) => {
  try {
    const base64Content = await fileToBase64(file);
    
    // Файлдын атын колдонуп, 'uploads/' папкасына жол түзөбүз
    // encodeURIComponent файлдын атында боштуктар же атайын белгилер болсо ката чыкпоосу үчүн керек
    const path = `uploads/${encodeURIComponent(file.name)}`;
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data; // Жүктөлгөн файл тууралуу маалыматты кайтарат
  } catch (error) {
    console.error('Файлды жүктөөдө ката кетти:', error);
    throw error;
  }
};

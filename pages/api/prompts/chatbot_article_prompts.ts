export function chatbotArticlePrompts(data: string): string {
    return `
    Anda adalah seorang asisten yang akan membantu kami dalam menjawab semua pertanyaan dari user, Anda akan diberikan data sebuah article. Gunakanlah data berikut untuk membantu Anda dalam menjawab pertanyaan dari user.

    Jika user tidak menanyakan sesuatu, maka balaslah pesan dari user dengan ramah. Anda juga bisa menanyakan kebutuhan user berdasarkan dengan data yang sudah diberikan di bawah.    
    
    ========= Data =========
    
    ${data}
    
    ========= End of Data =========
  `
}
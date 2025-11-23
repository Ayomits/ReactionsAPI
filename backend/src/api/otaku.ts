const baseUrl = 'https://api.otakugifs.xyz';

export class OtakuClient {
  static create() {
    return new OtakuClient();
  }

  async findSingleReaction(name: string) {
    const resp = await fetch(`${baseUrl}/gif?reaction=${name}`, {
      method: 'GET',
    });

    if (!resp.ok) {
      return null;
    }

    return (await resp.json()) as { url: string };
  }

  async findAllReactions() {
    const resp = await fetch(`${baseUrl}/gif/allreactions`, {
      method: 'GET',
    });

    if (!resp.ok) {
      return null;
    }

    return (await resp.json()) as { reactions: string[] };
  }
}

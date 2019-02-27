
export class Board {
    private tiles: string[];

    constructor() {
        this.tiles = [];
        for (let i = 0; i < 9; i++) {
            this.tiles.push("");
        }
    }

    public getTiles(): string[] {
        return this.tiles;
    }

    public getTile(x: number, y: number): string {
        return this.tiles[this.getIndex(x, y)];
    }

    public setTile(x: number, y: number, symbol: string): void {
        this.tiles[this.getIndex(x, y)] = symbol;
    }

    public getTilesText(): string {
        let strTiles = "";
        for (const tile of this.tiles) {
            strTiles += `${tile}:`;
        }
        return strTiles;
    }

    private getIndex(x: number, y: number) {
        x++;
        y++;
        const z = ((y - 1) * 3)  + x;
        console.log(`z = ${z}`);
        return z - 1;
    }
}

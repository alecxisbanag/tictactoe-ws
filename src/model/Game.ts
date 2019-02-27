import { ResponseEnum } from "../enum/response.enum";
import { Board } from "./Board";

export class Game {
    private id: string;
    private started: boolean;
    private playersCount: number;
    private board: Board;

	constructor($id: string) {
    this.id = $id;
    this.started = false;
    this.playersCount = 1;
    this.board = new Board();
  }

  public getId(): string {
    return this.id;
  }

  public getBoard(): Board {
    return this.board;
  }

  public isStarted(): boolean {
    return this.started;
  }

  public setStarted(started: boolean): void {
    this.started = started;
  }

  public resetGame(): void {
    this.started = false;
    this.board = new Board();
    this.playersCount = 0;
  }

  public checkIn(): string {
    this.playersCount++;
    if (this.playersCount === 2) {
      this.startGame();
      return ResponseEnum.O;
    } else {
      return ResponseEnum.X;
    }
  }

  public startGame(): void {
    this.started = true;
  }

}

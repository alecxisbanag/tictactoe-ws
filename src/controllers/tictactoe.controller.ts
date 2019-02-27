import { Request, Response, Router  } from "express";
import { ResponseEnum } from "../enum/response.enum";
import { Game } from "../model/Game";

const router: Router = Router();
const games: Map<string, Game> = new Map();

router.get("/createGame", (req: Request, res: Response) => {
    res.set("Content-Type", "text/plain");
    const key: string = req.query.key;
    if (key) {
        if (!games.get(key)) {
            games.set(key, new Game(key));
            res.send(ResponseEnum.X);
        } else {
            const game: Game = <Game> games.get(key);
            if (game.isStarted()) {
                res.send(ResponseEnum.GAME_ALREADY_STARTED);
            } else {
                res.send(game.checkIn());
            }
        }
    } else {
        res.send(ResponseEnum.ERROR);
    }
});

router.get("/reset", (req: Request, res: Response) => {
    res.set("Content-Type", "text/plain");
    const key: string = req.query.key;
    if (key) {
        if (games.get(key)) {
            const game: Game = <Game> games.get(key);
            if (game.isStarted()) {
                game.resetGame();
                res.send(ResponseEnum.EXIT);
            } else {
                res.send(ResponseEnum.NO_GAME_EXIST);
            }
        } else {
            res.send(ResponseEnum.NO_GAME_EXIST);
        }
    } else {
        res.send(ResponseEnum.ERROR);
    }
});

router.get("/check", (req: Request, res: Response) => {
    res.set("Content-Type", "text/plain");
    const key: string = req.query.key;
    if (key) {
        if (games.get(key)) {
            const game: Game = <Game> games.get(key);
            if (game.isStarted()) {
                res.send(true);
            } else {
                res.send(false);
            }
        } else {
            res.send(false);
        }
    } else {
        res.send(ResponseEnum.ERROR);
    }
});

router.get("/board", (req: Request, res: Response) => {
    res.set("Content-Type", "text/plain");
    const key: string = req.query.key;
    if (key) {
        if (games.get(key)) {
            const game: Game = <Game> games.get(key);
            if (game.isStarted()) {
                res.send(game.getBoard().getTilesText());
            } else {
                res.send(ResponseEnum.NOT_STARTED);
            }
        } else {
            res.send(ResponseEnum.NOT_STARTED);
        }
    } else {
        res.send(ResponseEnum.ERROR);
    }
});

router.get("/move", (req: Request, res: Response) => {
    res.set("Content-Type", "text/plain");
    const key: string = req.query.key;
    const tile: string = req.query.tile;
    const x: number = +req.query.x;
    const y: number = +req.query.y;

    if (key && tile && !Number.isNaN(x) && !Number.isNaN(y) && (tile === "X" || tile === "O") ) {
        if (games.get(key)) {
            const game: Game = <Game> games.get(key);
            if (game.isStarted()) {
                if (game.getBoard().getTile(x, y)) {
                    res.send(ResponseEnum.TAKEN);
                } else {
                    game.getBoard().setTile(x, y, tile);
                    res.send(game.getBoard().getTilesText());
                }
            } else {
                res.send(ResponseEnum.NOT_STARTED);
            }
        } else {
            res.send(ResponseEnum.NOT_STARTED);
        }
    } else {
        res.send(ResponseEnum.ERROR);
    }
});

export const TicTacToeController: Router = router;

import { Component, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";

@Component({
  selector: "app-play",
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.css"]
})
export class PlayComponent implements OnInit {
  horisontalPlayer = 0;
  verticalPlayer = 0;
  wh = window.innerHeight;
  ww = window.innerWidth;
  settingWidth;

  wallFind;
  boxFind;
  boxFindIndex;
  nextBoxOrWall;
  // settingW

  game = {
    play: true,
    state: "Noch nicht gestartet",
    time: 60
  };

  wall = [
    [30, 0],
    [30, 5],
    [30, 15],
    [30, 20],
    [30, 40],
    [30, 35],
    [30, 45],
    [30, 50],
    [40, 50],
    [35, 40],
    [45, 45]
  ];

  box = [[0, -111], [50, 10], [20, 5], [35, 50]];

  field = [[0, -111], [95, 95], [90, 95], [85, 95]];
  constructor() {}

  @HostListener("document:keypress", ["$event"])
  eventKeyPlayer(event: KeyboardEvent) {
    if (this.game.state == "Noch nicht gestartet") {
      this.game.state = "Das spiel leuft";
    }

    if (
      event.key === "d" &&
      this.horisontalPlayer < 95 &&
      this.game.play === true
    ) {
      let a = this.horisontalPlayer + 5;
      let b = this.verticalPlayer;
      let c = this.horisontalPlayer + 10;

      this.wallFindFunction(a, b);
      this.boxFindFunction(a, b);
      // console.log(this.boxFind);
      if (!this.wallFind && !this.boxFindIndex) {
        this.horisontalPlayer = this.horisontalPlayer + 5;
      }

      // if (!this.wallFind && this.boxFindIndex) {
      //   this.horisontalPlayer = this.horisontalPlayer + 5;
      //   this.box[this.boxFindIndex][0] = this.box[this.boxFindIndex][0] + 5;
      // }
      if (!this.wallFind && this.boxFindIndex && this.horisontalPlayer < 90) {
        this.nextBoxOrWallFind(b, c);
        if (!this.nextBoxOrWall) {
          this.horisontalPlayer = this.horisontalPlayer + 5;
          this.box[this.boxFindIndex][0] = this.box[this.boxFindIndex][0] + 5;
          this.gameFinished();
        } else {
          console.log("wand");
        }
      }
      this.nextBoxOrWall = undefined;

      this.boxFindIndex = undefined;
    }
    if (
      event.key === "a" &&
      this.horisontalPlayer > 0 &&
      this.game.play === true
    ) {
      let a = this.horisontalPlayer - 5;
      let b = this.verticalPlayer;
      let c = this.horisontalPlayer - 10;
      this.wallFindFunction(a, b);
      this.boxFindFunction(a, b);

      // this.boxFindFunction(a, b);

      if (!this.wallFind && !this.boxFindIndex) {
        this.horisontalPlayer = this.horisontalPlayer - 5;
      }
      // if (!this.wallFind && this.boxFindIndex) {
      //   this.horisontalPlayer = this.horisontalPlayer - 5;
      //   this.box[this.boxFindIndex][0] = this.box[this.boxFindIndex][0] - 5;
      // }
      if (!this.wallFind && this.boxFindIndex && this.horisontalPlayer > 5) {
        this.nextBoxOrWallFind(b, c);
        if (!this.nextBoxOrWall) {
          this.horisontalPlayer = this.horisontalPlayer - 5;
          this.box[this.boxFindIndex][0] = this.box[this.boxFindIndex][0] - 5;
          this.gameFinished();
        } else {
          // console.log("wand");
        }
      }
      this.nextBoxOrWall = undefined;
      this.boxFindIndex = undefined;
    }
    if (
      event.key === "w" &&
      this.verticalPlayer >= 1 &&
      this.game.play === true
    ) {
      let a = this.horisontalPlayer;
      let b = this.verticalPlayer - 5;
      let c = this.verticalPlayer - 10;

      this.wallFindFunction(a, b);
      this.boxFindFunction(a, b);

      // this.boxFindFunction(a, b);

      if (!this.wallFind && !this.boxFindIndex) {
        this.verticalPlayer = this.verticalPlayer - 5;
      }
      // if (!this.wallFind && this.boxFindIndex) {
      //   this.verticalPlayer = this.verticalPlayer - 5;
      //   this.box[this.boxFindIndex][1] = this.box[this.boxFindIndex][1] - 5;
      // }
      if (!this.wallFind && this.boxFindIndex && this.verticalPlayer >= 6) {
        this.nextBoxOrWallFind2(a, c);
        if (!this.nextBoxOrWall) {
          this.verticalPlayer = this.verticalPlayer - 5;
          this.box[this.boxFindIndex][1] = this.box[this.boxFindIndex][1] - 5;
          this.gameFinished();
        } else {
          // console.log("wand");
        }
      }
      this.nextBoxOrWall = undefined;
      this.boxFindIndex = undefined;
    }
    if (
      event.key === "s" &&
      this.verticalPlayer < 95 &&
      this.game.play === true
    ) {
      let a = this.horisontalPlayer;
      let b = this.verticalPlayer + 5;
      let c = this.verticalPlayer + 10;

      this.wallFindFunction(a, b);
      this.boxFindFunction(a, b);

      // this.boxFindFunction(a, b);

      if (!this.wallFind && !this.boxFindIndex) {
        this.verticalPlayer = this.verticalPlayer + 5;
      }
      // if (!this.wallFind && this.boxFindIndex) {
      //   this.verticalPlayer = this.verticalPlayer + 5;
      //   this.box[this.boxFindIndex][1] = this.box[this.boxFindIndex][1] + 5;
      // }
      if (!this.wallFind && this.boxFindIndex && this.verticalPlayer < 90) {
        this.nextBoxOrWallFind2(a, c);
        if (!this.nextBoxOrWall) {
          this.verticalPlayer = this.verticalPlayer + 5;
          this.box[this.boxFindIndex][1] = this.box[this.boxFindIndex][1] + 5;
          this.gameFinished();
        } else {
          // console.log("wand");
        }
      }
      this.nextBoxOrWall = undefined;
      this.boxFindIndex = undefined;
    }
  }
  ngOnInit() {
    setInterval(() => {
      this.wh = window.innerHeight;
      this.ww = window.innerWidth;
      this.settingWidth = window.innerWidth - this.wh;
      // console.log(this.tt);
    }, 10);
    setInterval(() => {
      if (this.game.state == "Das spiel leuft") {
        this.game.time = this.game.time - 1;
        if (this.game.time === 0) {
          this.game.state = "Verloren";
          this.game.play = false;
        }
      }
    }, 1000);
  }
  gameStart() {
    this.game.play = true;
    this.game.state = "Das spiel leuft";
    this.game.time = 60;
    this.box = [[0, -111], [80, 15], [50, 10], [20, 5]];

    this.horisontalPlayer = 0;
    this.verticalPlayer = 0;
  }
  gameEnd() {
    this.game.play = false;
    this.game.state = "Verloren";
    // this.game.time = 60;
  }

  wallFindFunction(a, b) {
    this.wallFind = this.wall.find(item => {
      return item[0] === a && item[1] === b;
    });
  }

  boxFindFunction(a, b) {
    this.boxFind = this.box.find((item, index) => {
      if (item[0] === a && item[1] === b) {
        // console.log(item[0]);
        console.log(index);
        this.boxFindIndex = index;
        return item[0] === a && item[1] === b;
      }
    });
    // console.log(this.boxFind);
  }

  nextBoxOrWallFind(b, c) {
    // console.log(b);
    let nextBox;
    let nextWall;
    nextBox = this.box.find((item, index) => {
      if (item[0] === c && item[1] === b) {
        // console.log(item[0]);
        // console.log(index);
        // this.boxFindIndex = index;
        return item[0] === c && item[1] === b;
      }
    });
    nextWall = this.wall.find(item => {
      return item[0] === c && item[1] === b;
    });

    if (nextBox || nextWall) {
      this.nextBoxOrWall = true;
      console.log(this.nextBoxOrWall);
    }
  }

  nextBoxOrWallFind2(a, c) {
    console.log(a);
    let nextBox;
    let nextWall;
    nextBox = this.box.find((item, index) => {
      if (item[0] === a && item[1] === c) {
        // console.log(item[0]);
        console.log(index);
        // this.boxFindIndex = index;
        return item[0] === a && item[1] === c;
      }
    });
    nextWall = this.wall.find(item => {
      return item[0] === a && item[1] === c;
    });

    if (nextBox || nextWall) {
      this.nextBoxOrWall = true;
      // console.log(this.nextBoxOrWall);
    }
  }

  gameFinished() {
    let counter = 0;
    for (let itemBox of this.box) {
      for (let itemField of this.field) {
        if (itemBox[1] === itemField[1] && itemBox[0] === itemField[0]) {
          counter = counter + 1;
          console.log(counter);
        }
      }
    }
    if (counter === this.box.length) {
      this.game.play = false;
      this.game.state = "Gewonnen";
      console.log(this.game.play);
    }
    // console.log("nnnnnnnnnnnnnnnnnnnnn");
    // console.log(this.box, this.field);
    // let k = this.field[1][0] - 5;
    // if (this.box[1][0] === this.field[1][0] - 5) {
    //   this.game.play = false;
    //   console.log(this.game.play);
    // }
  }

  // clickKey(event) {
  //   console.log(event.offsetY);
  //   let rect = document.querySelector(".player");
  //   // event.preventDefault();
  //   console.log(event.key.a);

  //   let rect3 = rect.getBoundingClientRect();

  //   let left = rect3.left;
  //   console.log(left);
  //   let rect2 = document.querySelector(".player").getBoundingClientRect().width;
  //   console.log(rect2);
  //   let wh = window.innerHeight;
  //   let ww = window.innerWidth;

  //   console.log(wh, ww);
  // }

  // enter(event) {
  //   this.l = 400;
  //   console.log("dddddddddddddd", event.key);
  // }
  // enter2(event) {
  //   event.preventDefault();
  //   console.log(event);
  // }
}

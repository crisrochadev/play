<template>
  <div class="w-full max-w-sm h-full justify-center items-center flex">
    <div
      class="w-full h-auto grid relative gap-1 items"
      :style="{ ...gridCols }"
    >
      <template v-for="item in playIcons" :key="item.id">
        <button
          :id="item.id"
          ref="cards"
          @click="setViews(item)"
          class="card bg-blue-100 rounded shadow-md hover:bg-blue-200 transition-all delay-100"
          :style="{ ...padding }"
          :class="{ done: item.done }"
        >
          <span
            v-show="isView(item)"
            class="material-icons-sharp"
            :style="{ ...fontSize }"
            >{{ item.name }}</span
          >
          <span
            v-show="!isView(item)"
            class="material-icons-sharp"
            :style="{ ...fontSize }"
            >question_mark</span
          >
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { icons } from "../lib/icons";
import { useSound } from '@vueuse/sound'
import popDown from '../assets/sounds/pop-down.mp3'
import popUpOn from '../assets/sounds/pop-up-on.mp3'
import success from '../assets/sounds/success.wav'
import fanfare from '../assets/sounds/fanfare.mp3'

export default {
  data() {
    const activeSound = useSound(popDown, { volume: 1 })
    const onSound = useSound(popUpOn, { volume: 1 });
    const successSound = useSound(success, { volume: 1 });
    const fanfareSound = useSound(fanfare, { volume: 1 });
    return {
      icons,
      activeSound,
      onSound,
      successSound,
      fanfareSound,
      levels: [0, 2, 2, 3, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      level: 1,
      views: [],
      checkedIcons: [],
    };
  },
  computed: {
    iconsQtd() {
      return this.level * 2;
    },
    gridCols() {
      return { gridTemplateColumns: `repeat(${this.levels[this.level]}, 1fr)` };
    },
    playIcons() {
      return this.mountGame();
    },

    fontSize() {
      return { fontSize: `${30 - this.level}px !important` };
    },
    padding() {
      return { padding: `${15 - this.level}px !important` };
    },
  },
  mounted() {
    this.mountGame();
  },
  methods: {
    shuffleArray(array) {
      function compareRandom(a, b) {
        return Math.random() - 0.5;
      }

      // Reordena o array usando o comparador de números aleatórios
      array.sort(compareRandom);
      return array;
    },
    isView(item) {
      let checked = this.checkedIcons.some((check) =>
        check.every((icon) => icon.name === item.name)
      );
      return this.views.some((view) => view.id === item.id) || checked;
    },
    mountGame() {
      let icons = this.icons.filter((icon, index) => {
        if (index < this.iconsQtd) return icon;
      });

      return this.shuffleArray([...icons, ...icons]).map((icon, index) => ({
        id: index,
        name: icon,
      }));
    },
    checkWinner() {
      if (this.checkedIcons.length * 2 === this.playIcons.length) {
        this.fanfareSound.play();
        this.views = [];
        this.checkedIcons = [];
        if(this.level < 18) this.level++
        else this.level = 1;
      }
    },
    removeView(cards) {
      setTimeout(() => {
        this.views.forEach((card) => {
          let index = this.playIcons.findIndex((icon) => icon.id === card.id);
          this.playIcons[index]["done"] = false;
        });
        cards.forEach((card) => {
          if (
            this.checkedIcons.length === 0 ||
            !this.checkedIcons.some((icon) => parseInt(icon.id)) ===
              parseInt(card.id)
          )
            card.blur();
        });
        this.views = [];
      }, 2000);
    },
    setViews(item) {
      if (!item.done) {
        this.activeSound.play()
        let cards = Array.from(this.$refs.cards);
        item["done"] = true;
        this.views.push(item);
        if (this.views.length > 1) {
          if (this.views.every((view) => view.name === item.name)) {
            this.successSound.play();
            this.checkedIcons.push(this.views);
            this.views = [];
            //Fazer verificação se acabou
            this.checkWinner();
          } else {
            this.removeView(cards);
          }
        }
      }
    },
  },
};
</script>

<style>
@keyframes flip {
  0% {
    transform: rotateY(0deg);
    color: transparent;
  }
  50% {
    transform: rotateY(180deg);
  }
}
/* .card:focus {
  animation: flip;
  transition: 0.3s;
  background-color: rgb(101, 228, 186);
  animation-duration: 1s;
  transform: rotateY(180deg);
  color: rgb(4, 44, 44);
} */
.card.done {
  animation: flip;
  transition: 0.3s;
  background-color: rgb(101, 228, 186);
  animation-duration: 1s;
  transform: rotateY(180deg);
  color: rgb(4, 44, 44);
}
</style>

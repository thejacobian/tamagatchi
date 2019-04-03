/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

class Tamagotchi {
  constructor(name, type, icon) {
    this.name = name;
    this.type = type;
    this.icon = icon;
    this.age = '0';
    this.hunger = '0';
    this.sleepiness = '0';
    this.boredom = '0';
    this.actionsArr = [];
    this.$tamaLocation = '';
    this.message = '';
    this.$commsBar = $('.tama-comms').children('h1').eq(0);
  }

  feed(weighting, message) {
    if (message === '') {
      this.message = `${this.name} was fed ${weighting} units.  Hunger Level now: ${this.hunger}`;
    } else {
      this.message = message;
    }
    if (this.hunger > 0) {
      this.hunger = parseFloat(this.hunger) - weighting;
    }
    console.log(this.message);
    $(this.$commsBar).text(this.message);
    this.actionsArr.push(this.message);
    return this.hunger;
  }

  sleep(weighting, message) {
    if (message === '') {
      this.message = `${this.name} took a nap for ${weighting} units. Sleepiness Level now: ${this.sleepiness}`;
    } else {
      this.message = message;
    }
    if (this.sleepiness > 0) {
      this.sleepiness = parseFloat(this.sleepiness) - weighting;
    }
    console.log(this.message);
    $(this.$commsBar).text(this.message);
    this.actionsArr.push(this.message);
    return this.sleepiness;
  }

  play(weighting, message) {
    if (message === '') {
      this.message = `${this.name}'s was played with for ${weighting} units. Boredom Level now: ${this.boredom}`;
    } else {
      this.message = message;
    }
    if (this.boredom > 0) {
      this.boredom = parseFloat(this.boredom) - weighting;
    }
    console.log(this.message);
    $(this.$commsBar).text(this.message);
    this.actionsArr.push(this.message);
    return this.sleepiness;
  }
}

class Robovac extends Tamagotchi {
  constructor(name, type, icon) {
    super(name, type, icon);
    this.hunger = '100';
    this.sleepiness = '100';
    this.boredom = '100';
  }

  feed(weighting) {
    if (this.age < 5) {
      this.message = `The ${this.type} was emptied for +${weighting}. Emptiness Level now: ${this.hunger}`;
    } else {
      this.message = `The ${this.type}s were emptied for +${weighting}. Emptiness Level now: ${this.hunger}`;
    }
    super.feed((weighting * -1), this.message);
  }

  sleep(weighting) {
    if (this.age < 5) {
      this.message = `The ${this.type} was charged for +${weighting}. Battery Level now: ${this.sleepiness}`;
    } else {
      this.message = `The ${this.type}s were charged for +${weighting}. Battery Level now: ${this.sleepiness}`;
    }
    super.sleep((weighting * -1), this.message);
  }

  play(weighting) {
    if (this.age < 5) {
      this.message = `The ${this.type} was played with for +${weighting}. Happiness Level now: ${this.boredom}`;
    } else {
      this.message = `The ${this.type}s were played with for +${weighting}. Happiness Level now: ${this.boredom}`;
    }
    super.play((weighting * -1), this.message);
  }
}

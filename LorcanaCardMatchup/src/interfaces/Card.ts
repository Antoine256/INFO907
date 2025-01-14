
export class Card{
  //charactéristique : Artist, Set_name, classification, date Added, abilities, set_num, Color, Fran,chise, Image, cost, inkable, name, type, lors, rarity, flavor_text, unique_id, card_num, body_text, willpower, date_modified, strength, set_id
  artist: string;
  set_name: string;
  classifications?: string;
  date_added: string;
  set_num: number;
  color: string;
  franchise: string;
  image: string;
  cost: number;
  inkable: boolean;
  name: string;
  type: string;
  lore?: number;
  rarity: string;
  unique_id: string;
  card_num: number;
  body_text?: string;
  willpower?: number;
  date_modified: string;
  strength?: number;
  set_id: string;
  gamemode?: string;
  move_cost?: number;
  flavor_text?: string;
  abilities?: string;
  card_variants?: string;

  constructor(
    artist: string,
    set_name: string,
    date_added: string,
    set_num: number,
    color: string,
    franchise: string,
    image: string,
    cost: number,
    inkable: boolean,
    name: string,
    type: string,
    rarity: string,
    unique_id: string,
    card_num: number,
    date_modified: string,
    set_id: string,
    gamemode?: string,
    move_cost?: number,
    flavor_text?: string,
    abilities?: string,
    body_text?: string,
    lore?: number,
    willpower?: number,
    strength?: number,
    classifications?: string,
    card_variants?: string
  ) {
    this.artist = artist;
    this.set_name = set_name;
    this.classifications = classifications;
    this.date_added = date_added;
    this.abilities = abilities;
    this.set_num = set_num;
    this.color = color;
    this.franchise = franchise;
    this.image = image;
    this.cost = cost;
    this.inkable = inkable;
    this.name = name;
    this.type = type;
    this.lore = lore;
    this.rarity = rarity;
    this.flavor_text = flavor_text;
    this.unique_id = unique_id;
    this.card_num = card_num;
    this.body_text = body_text;
    this.willpower = willpower;
    this.date_modified = date_modified;
    this.strength = strength;
    this.set_id = set_id;
    this.gamemode = gamemode;
    this.move_cost = move_cost;
    this.card_variants = card_variants;
  }

}

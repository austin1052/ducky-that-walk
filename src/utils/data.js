export const options = {
  playerOptions: {
    category: "player",
    label: "Choose 3 Players",
    max: 3,
    multiplier: 1
  },
  slayerOptions: {
    category: "slayer",
    label: "Choose 2 Slayers",
    max: 2,
    multiplier: 2
  },
  winnerOptions: {
    category: "winner",
    label: "Choose 1 Winner",
    max: 1,
    multiplier: 3
  }
}

export const queenData = {
  amethyst: {
    name: "Amethyst",
    active: true,
    stans: []
  },
  anetra: {
    name: "Anetra",
    active: true,
    stans: []
  },
  auramayari: {
    name: "Aura Mayari",
    active: true,
    stans: []
  },
  irenedubois: {
    name: "Irene Dubois",
    active: false,
    stans: []
  },
  jax: {
    name: "Jax",
    active: true,
    stans: []
  },
  looseyladuca: {
    name: "Loosey LaDuca",
    active: true,
    stans: []
  },
  luxxnoirlondon: {
    name: "Luxx Noir London",
    active: true,
    stans: []
  },
  mbdf: {
    name: "Malaysia Babydoll Foxx",
    active: true,
    stans: []
  },
  marciax3: {
    name: "Marcia Marcia Marcia",
    active: true,
    stans: []
  },
  mib: {
    name: "Mistress Isabelle Brooks",
    active: true,
    stans: []
  },
  princesspoppy: {
    name: "Princess Poppy",
    active: true,
    stans: []
  },
  robinfierce: {
    name: "Robin Fierce",
    active: true,
    stans: []
  },
  salinaestitties: {
    name: "Salina EsTitties",
    active: true,
    stans: []
  },
  sashacolby: {
    name: "Sasha Colby",
    active: true,
    stans: []
  },
  spice: {
    name: "Spice",
    active: true,
    stans: []
  },
  sugar: {
    name: "Sugar",
    active: true,
    stans: []
  }
}

export const playerData = [
  {
    username: "raqueli",
    name: "Raquel",
    houseName: "miss llama yass",
    totalPoints: 0
  },
  {
    username: "austinc",
    name: "Austin",
    houseName: "Shartier",
    totalPoints: 50
  },
  {
    username: "amandas",
    name: "Amanda",
    houseName: "broke my damn toe",
    totalPoints: 85
  },
  {
    username: "jackd",
    name: "Jack",
    houseName: "House the boots down",
    totalPoints: 102
  },
  {
    username: "carsonm",
    name: "Carson",
    houseName: "boot boots boots slay",
    totalPoints: 78
  },
  {
    username: "alexc",
    name: "Alex",
    houseName: "Alex's Queen Team",
    totalPoints: 150
  },
  {
    username: "ariel",
    name: "Ariel",
    houseName: "House House House Bootsed",
    totalPoints: 124
  },
  {
    username: "caroline",
    name: "Caroline",
    houseName: "Sop you up like a biscuit!",
    totalPoints: 106
  },
  {
    username: "hotdog",
    name: "Hotdog",
    houseName: "kitty kitty purr",
    totalPoints: 188
  },
  {
    username: "cowboy",
    name: "Cowboy",
    houseName: "stinky lips",
    totalPoints: 68
  }
]


export const buttonColors = {
  winner: {
    borderColor: "var(--goldBorder)",
    background: "var(--gold)"
  },
  mini: {
    borderColor: "var(--silverBorder)",
    background: "var(--silver)"
  },
  top: {
    borderColor: "var(--greenBorder)",
    background: "var(--green)"
  },
  low: {
    borderColor: "var(--yellowBorder)",
    background: "var(--yellow)"
  },
  bottom: {
    borderColor: "var(--orangeBorder)",
    background: "var(--orange)"
  },
  eliminated: {
    borderColor: "var(--redBorder)",
    background: "var(--red)"
  },
  grey: {
    borderColor: "var(--lightOpaque)"
  }
}

export const pointValues = {
  winner: 10,
  mini: 2,
  top: 7.5,
  low: 2.5,
  bottom: 0,
  eliminated: 0
}

export const initialCategories = {
  winner: false,
  mini: false,
  top: false,
  low: false,
  bottom: false,
  eliminated: false
}

export const initialButtonStyles = {
  winner: buttonColors.grey,
  mini: buttonColors.grey,
  top: buttonColors.grey,
  bottom: buttonColors.grey,
  low: buttonColors.grey,
  eliminated: buttonColors.grey
}

export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  getModalPosition,
  saveToStorage,
  loadFromStorage,
  getbgImgs,
  checkIfImg,
  timePassed,
  dueDateTimeFormat,
  dueDateFormat
};

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  var txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const WEEK = 1000 * 60 * 60 * 24 * 7;

  const pastTime = getRandomIntInclusive(HOUR, WEEK);
  return Date.now() - pastTime;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function getModalPosition(type, ref) {
  const rect = ref.current.getBoundingClientRect();
  const pos = { bottom: rect.bottom + 8, left: rect.left };
  if (window.innerWidth - rect.right < 150) pos.left -= 130;
  if (window.innerHeight - rect.bottom < 450) pos.bottom -= 200;
  return pos;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getbgImgs() {
  return bgImgs;
}

function checkIfImg(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function timePassed(timestamp) {
  var currentTime = new Date().getTime();
  var timePassed = currentTime - timestamp;
  var seconds = Math.floor(timePassed / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var weeks = Math.floor(days / 7);
  var months = Math.floor(days / 30);
  if (months > 0) {
    if (months == 1) {
      return months + " month " + (days % 30) + " days ago";
    } else {
      return months + " months " + (days % 30) + " days ago";
    }
  } else if (weeks > 0) {
    if (weeks == 1) {
      return weeks + " week " + (days % 7) + " days ago";
    } else {
      return weeks + " weeks " + (days % 7) + " days ago";
    }
  } else if (days > 0) {
    if (days == 1) {
      return days + " day " + (hours % 24) + " hours ago";
    } else {
      return days + " days " + (hours % 24) + " hours ago";
    }
  } else if (hours > 0) {
    if (hours == 1) {
      return hours + " hour " + (minutes % 60) + " minutes ago";
    } else {
      return hours + " hours " + (minutes % 60) + " minutes ago";
    }
  } else if (minutes > 0) {
    if (minutes == 1) {
      return minutes + " minute ago";
    } else {
      return minutes + " minutes ago";
    }
  } else {
    if (seconds == 1) {
      return seconds + " second ago";
    } else {
      return seconds + " seconds ago";
    }
  }
}

function dueDateTimeFormat(dueDate) {
  const currYear = new Date().getFullYear();
  const dueYear = new Date(dueDate).getFullYear();
  let strDate = "";
  strDate += `${new Date(dueDate).toLocaleString("en-US", {
    day: "numeric",
  })} `;
  strDate += `${new Date(dueDate).toLocaleString("en-US", {
    month: "short",
  })} at `;
  if (dueYear !== currYear) {
    strDate += `${dueYear} `;
  }
  strDate += `${new Date(dueDate)
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toLocaleUpperCase()}`;
  return strDate;
}

function dueDateFormat(dueDate) {
  return new Date(dueDate).toLocaleString('en-US', { day: 'numeric', month: 'short' });
}



const bgImgs = [
  {
    id: "P-yzuyWFEIk",
    user: "dreiimos",
    url: "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "vK26p2SFX3E",
    user: "jeremygbrady",
    url: "https://images.unsplash.com/photo-1615412704911-55d589229864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwyfHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "bhCdwWNmXw8",
    user: "jplenio",
    url: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwzfHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "GTL39WM6QqA",
    user: "paulinehe",
    url: "https://images.unsplash.com/photo-1611918126831-0a8352d6196f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHw0fHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "OJ02cQHePds",
    user: "acquireapp",
    url: "https://images.unsplash.com/photo-1610147323479-a7fb11ffd5dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHw1fHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "usVYPlEuPK4",
    user: "technicalapurba",
    url: "https://images.unsplash.com/photo-1613339027986-b94d85708995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHw2fHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "1jlJrr4XGkU",
    user: "thomasbennie",
    url: "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHw3fHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "s-y2HJElONo",
    user: "wesnext",
    url: "https://images.unsplash.com/photo-1610552050890-fe99536c2615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHw4fHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "KVBSOTQvKyk",
    user: "asakawakohji",
    url: "https://images.unsplash.com/photo-1622899505135-694e8ccffce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHw5fHxuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NzQ0ODg3MzU&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "_XLmDKEvxrk",
    user: "romandempire",
    url: "https://images.unsplash.com/photo-1615051179134-62696ea77ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxMHx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "2H2YSpew3kU",
    user: "pavlpolo_official",
    url: "https://images.unsplash.com/photo-1620052581237-5d36667be337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxMXx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "fJQSCxB18wE",
    user: "gavrushchenko",
    url: "https://images.unsplash.com/photo-1614983652406-41044db11dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxMnx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "suSwPNTaQ5Q",
    user: "tanelah",
    url: "https://images.unsplash.com/photo-1565772838491-cbeb32fac6ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxM3x8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "Zi3Pt6lW1eo",
    user: "kylebushnell",
    url: "https://images.unsplash.com/photo-1621468635836-494461c17b64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxNHx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "hkLOXLA8QEA",
    user: "sunillnaik",
    url: "https://images.unsplash.com/photo-1613967193490-1d17b930c1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxNXx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "xsSQIvMZles",
    user: "kylanh",
    url: "https://images.unsplash.com/photo-1621820932454-76e98d967237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxNnx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "5eS6N-Wtg1g",
    user: "kinoishyia5",
    url: "https://images.unsplash.com/photo-1612467968134-e58957756c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxN3x8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "aDVViCOi16w",
    user: "vercluka",
    url: "https://images.unsplash.com/photo-1620069023056-ed82c713e75e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxOHx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "GlStz1mk3pY",
    user: "caleb_carl",
    url: "https://images.unsplash.com/photo-1626370413871-cecefa2de727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwxOXx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
  {
    id: "F2kHXy9kjEU",
    user: "saikiranhd",
    url: "https://images.unsplash.com/photo-1615917018845-f705f7ec1388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDIwNzd8MHwxfHNlYXJjaHwyMHx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8fHwxNjc0NDg4NzM1&ixlib=rb-4.0.3&q=80&w=1920",
  },
];

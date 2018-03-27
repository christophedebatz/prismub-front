export const Strings = {

  ucfirst(str) {
    if (str && str.length > 0) {
      return str.substr(0, 1).toUpperCase() + str.substring(1);
    }
    return str;
  },

  hashcode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  },

  colorize(nb){
    const c = (nb & 0x00FFFFFF).toString(16).toUpperCase();
    return '00000'.substring(0, 6 - c.length) + c;
  }

};

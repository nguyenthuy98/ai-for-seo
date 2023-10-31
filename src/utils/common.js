export function randomstring() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  const stringLength = 8;
  let randomstring = '';
  for (let i = 0; i < stringLength; i += 1) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

export function copyText(self, text) {
  self.$clipboard(text);
  Vue.notify({
    type: 'success',
    title: 'Thành công',
    text: 'Đã sao chép vào clipboard',
  });
}

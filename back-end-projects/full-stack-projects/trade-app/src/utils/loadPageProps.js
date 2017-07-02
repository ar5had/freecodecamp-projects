export default function loadPageProps(title) {
  document.title = title;
  document.querySelector('.menu').classList.remove('open');
  document.body.style.cursor = 'default';
  // document.body doesnt not work in IE and firefox
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

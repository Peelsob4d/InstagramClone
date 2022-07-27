//create post elements
const createPost = (data) => {
  const article = document.createElement('article');
  article.classList.add('section-post', 'section-div', 'article-div');
  article.innerHTML = `
      <div class="section-post-name">
        <div class="section-post-userimg">
          <img src="${data.user_banner}" alt="banner">
        </div>
        <div class="section-post-info>
          <div class="post-info-name">
            <a href="${data.user_link}">${data.user_name}</a>
          </div>
          <div class="post-info-location">
            ${data.location}
          </div>
        </div>
      </div>
      <div class="section-post-image"></div>
      <div class="section-post-menu">
        <div class="post-menu-image-list"></div>
        <div class="post-menu-icons">
        </div>
        <div class="post-menu-inside">
          <div class="inside-likes"></div>
          <div class="inside-post">
            <a href=${data.user_link} class="inside-post-link>${data.user_name}</a>
            ${data.contents}
          </div>
        </div>
        <div class="post-menu-comment"></div>
      </div>
  `;
  article
    .querySelector('.section-post-image')
    .appendChild(createImageList(data.images));
  return article;
};

const createImageList = (imageList) => {
  const docFrag = document.createDocumentFragment();
  const album = document.createElement('div');
  const imagesDiv = document.createElement('div');

  album.classList.add('section-post-album-window');
  album.appendChild(imagesDiv);

  imagesDiv.classList.add('section-post-album');
  imageList.forEach((src) => {
    imagesDiv.innerHTML += `<img src=${src} alt=${src} class="section-post-album-image">`;
  });

  docFrag.appendChild(album);

  if (imageList.length !== 1) {
    const divButton = document.createElement('div');
    divButton.classList.add('section-post-album-button-box');

    const buttonPrev = document.createElement('button');
    buttonPrev.innerHTML = 'Prev';
    buttonPrev.classList.add('section-post-album-button');

    const buttonNext = document.createElement('button');
    buttonNext.innerHTML = 'Next';
    buttonNext.classList.add('section-post-album-button');

    const slideImage = () => {
      const MAX_INDEX = imageList.length - 1;
      let nowIndex = 0;
      const moveIndex = (direction) => {
        if (direction === 'next' && nowIndex !== MAX_INDEX) nowIndex += 1;
        else if (direction === 'prev' && nowIndex !== 0) nowIndex -= 1;
        imagesDiv.style.transform = `translateX(-${470 * nowIndex}px)`;
      };
      return moveIndex;
    };

    const slide = slideImage();
    buttonPrev.addEventListener('click', () => slide('prev'));
    buttonNext.addEventListener('click', () => slide('next'));

    divButton.appendChild(buttonPrev);
    divButton.appendChild(buttonNext);

    docFrag.appendChild(divButton);
  }

  return docFrag;
};

//fetching posts data
const fetchPosts = async () => {
  const datas = await fetch('mock.json')
    .then((datas) => datas.json())
    .then((datas) => datas.posts);
  const postDiv = document.querySelector('.section-articles');
  datas.forEach((data) => {
    const post = createPost(data);
    postDiv.appendChild(post);
  });
};

fetchPosts();

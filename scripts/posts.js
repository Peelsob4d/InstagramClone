//create post elements
import { getMyPost, createNewPost } from './api/post.js';

const createPostButton = document.querySelector('.nav-icon-add');
const postBox = document.getElementById('createPostBox');
const postForm = document.getElementById('createPostForm');

const createPost = (data) => {
  const article = document.createElement('article');
  article.classList.add('section-post', 'section-div', 'article-div');
  article.innerHTML = `
      <div class="section-post-name">
        <div class="section-post-userimg">
          <img src="${data.author.banner}" alt="banner">
        </div>
        <div class="section-post-info">
          <div class="post-info-name">
            <a href="">${data.author.name}</a>
          </div>
          <div class="post-info-location">
            ${data.location}
          </div>
        </div>
      </div>
      <div class="section-post-image"></div>
      <div class="section-post-menu">
        <section class="section-post-navbar">
          <div class="post-menu-icons">
            <div class="post-menu-icon">
              <button class="post-icon-like">
                <svg aria-label="좋아요" class="post-icon-svg" role="img" width="24" height="24">
                  <path
                    d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="post-menu-icon">
              <button class="post-icon-message">
              <svg 
              aria-label="댓글 달기" 
              class="_ab6-" 
              height="24" 
              role="img" 
              viewBox="0 0 24 24" 
              width="24">
              <path 
                d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" 
                fill="none" 
                stroke="currentColor" 
                stroke-linejoin="round" 
                stroke-width="2"></path>
              </svg>
            </button>
            </div>
            <div class="post-menu-icon">
              <button class="nav-icon-message">
                <svg aria-label="메시지" class="nav-icon-svg" role="img" width="24" height="24">
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="22"
                    x2="9.218"
                    y1="3"
                    y2="10.083"
                  ></line>
                  <polygon
                    fill="none"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></polygon>
                </svg>
              </button>
            </div>
          </div>
          <div class="post-menu-icon">
            <button class="nav-icon-bookmark">
              <svg aria-label="저장" class="_ab6-" height="24" role="img" viewBox="0 0 24 24" width="24">
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
              </svg>
            </button>
          </div>
        </section>
        <div class="post-menu-inside">
          <div class="inside-likes">좋아요 ${data.likes.count}개</div>
          <div class="inside-post">
            <div class="inside-post-content">
              <a href="" class="inside-post-link">${data.author.name}</a>
              ${data.content}
            </div>
          </div>
          <div class="post-menu-comment"></div>
        </div>
        <div class="post-date">${data.date.slice(0, 10)}</div>
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
    buttonPrev.innerHTML = `<div class='section-post-album-button-prev'/>`;
    buttonPrev.classList.add('section-post-album-button');

    const buttonNext = document.createElement('button');
    buttonNext.innerHTML = `<div class='section-post-album-button-next'/>`;
    buttonNext.classList.add('section-post-album-button');

    const iconFrag = document.createElement('div');
    iconFrag.classList.add('section-post-album-nav');
    iconFrag.innerHTML = `<div class="image-nav-blue"></div>${'<div class="image-nav"></div>'.repeat(
      imageList.length - 1,
    )}`;

    const slideImage = () => {
      const MAX_INDEX = imageList.length - 1;
      let nowIndex = 0;
      const disableButton = () => {
        if (nowIndex == 0) buttonPrev.firstChild.style.display = 'none';
        else buttonPrev.firstChild.style.display = 'block';
        if (nowIndex == MAX_INDEX) buttonNext.firstChild.style.display = 'none';
        else buttonNext.firstChild.style.display = 'block';
      };
      const changeNav = () => {
        iconFrag.childNodes.forEach((node) => {
          node.classList = ['image-nav'];
        });
        iconFrag.childNodes[nowIndex].classList = ['image-nav-blue'];
      };
      const moveIndex = (direction) => {
        if (direction === 'next' && nowIndex !== MAX_INDEX) nowIndex += 1;
        else if (direction === 'prev' && nowIndex !== 0) nowIndex -= 1;
        imagesDiv.style.transform = `translateX(-${470 * nowIndex}px)`;
        disableButton();
        changeNav();
      };
      return moveIndex;
    };

    const slide = slideImage();
    buttonPrev.addEventListener('click', () => slide('prev'));
    buttonNext.addEventListener('click', () => slide('next'));

    divButton.appendChild(buttonPrev);
    divButton.appendChild(buttonNext);
    docFrag.appendChild(divButton);
    docFrag.appendChild(iconFrag);
  }

  return docFrag;
};

createPostButton.addEventListener('click', () => {
  if (postBox.style.display === 'none') postBox.style.display = 'flex';
});

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await createNewPost(postForm);
  await fetchPosts();
  postBox.style.display = 'none';
});

//fetching posts data
const fetchPosts = async () => {
  const datas = await getMyPost();
  const postDiv = document.querySelector('.section-articles');
  datas.forEach((data) => {
    const post = createPost(data);
    postDiv.appendChild(post);
  });
};

fetchPosts();

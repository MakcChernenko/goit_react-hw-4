import { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header/Header';
import ImageGallery from './component/ImageGallery/ImageGallery';
import fetchArticlesWithTopic from './services/serviceApi';
import Modal from './component/Modal/Modal';
import Loader from './component/Loader/loader';

function App() {
  const [photos, setPhotos] = useState([]);
  const [topic, setTopic] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [addAmount, setAddAmount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [isButtonMore, setIbuttonMore] = useState(false);
  console.log(topic);
  //===цей ефект потрібен для отримання асинхронних відповідей із сервера і зміни стану для перерендерингу елементів.===
  useEffect(() => {
    const renderImagesWitchTopic = async (topic, addAmount) => {
      if (!topic) return;
      try {
        setLoader(true);
        setIbuttonMore(true);
        const data = await fetchArticlesWithTopic(topic, addAmount);
        setPhotos(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    renderImagesWitchTopic(topic, addAmount);
  }, [topic, addAmount]);
  //====ця маленька функція буде працювати як коллбек функція для onSearch, де викличеться всередині onSearch і отримає там параметр.===
  const handleSearchSubmit = newTopic => {
    setPhotos([]);
    setTopic(newTopic);
  };
  //===ця функція змінює стан isOpen на true, а також отримує і змінює індекс натиснутої картинки
  //і це мене турбує, бо виходить одна функція виконує дві дії, а не одну.
  const handleModal = index => {
    setModalIndex(index);
    setIsOpen(true);
    console.log(index);
  };
  //===ця функція закриває модалку.===
  const closeModal = () => {
    setIsOpen(false);
  };
  //===це колбек функція буде відслідковувати подію Escape і реагувати на це===
  const handleEscapePress = event => {
    if (event.key === 'Escape') {
      console.log('Натиснуто клавішу ESC');
      closeModal();
    }
  };
  //===цей користувацький ефект спрацює лише тоді коли модалка відкрита, теж маю сумнів у доречності цього хука тут, але
  // він потрібен для відслідковування події клавіатури===
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapePress);
      return () => {
        window.removeEventListener('keydown', handleEscapePress);
      };
    }
  }, [isOpen]);
  //===тут мені потрібна функція, яка буде при кліку додавати до modalIndex одиницю===
  const nextImage = () => {
    setModalIndex(modalIndex + 1);
    console.log(modalIndex);
  };
  //===а тут мені потрібна функція, яка буде при кліку віднімати до modalIndex одиницю===
  const prevImage = () => {
    setModalIndex(modalIndex - 1);
    console.log(modalIndex);
  };
  //===треба функція яка буде оновлювати пагінацію
  const newFetch = () => {
    if (photos.length >= 30) {
      alert('відповіді закінчилися');
      return;
    }
    setAddAmount(prevAmount => prevAmount + 10);
  };
  return (
    <>
      <Header onSearch={handleSearchSubmit} />
      <main>
        <h1>Unsplash Photos</h1>
        {loader && (
          <div className="container">
            <Loader />
          </div>
        )}
        <ImageGallery photos={photos} onImageClick={handleModal} />
        {isOpen && (
          <Modal
            image={photos[modalIndex]}
            closeImage={closeModal}
            nextImage={nextImage}
            prevImage={prevImage}
          />
        )}
        {isButtonMore && (
          <button onClick={newFetch} className="btnMore" type="button">
            more↓
          </button>
        )}
      </main>
    </>
  );
}

export default App;

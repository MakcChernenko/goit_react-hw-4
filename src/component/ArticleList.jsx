const ArticlesList = ({ items }) => {
  return (
    <ul>
      {items.map(({ objectID, url, title }) => (
        <li key={objectID}>
          <a href={url}>{title}</a>
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;

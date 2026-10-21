import { useState } from 'react';

// Coloque sua foto em public/paulo.jpg; enquanto ela não existir, aparecem as iniciais
const Avatar = () => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="avatar">
      {failed ? (
        <span className="avatar-initials">PR</span>
      ) : (
        <img src="/paulo.jpg" alt="Paulo Rinaldi" onError={() => setFailed(true)} />
      )}
    </div>
  );
};

export default Avatar;

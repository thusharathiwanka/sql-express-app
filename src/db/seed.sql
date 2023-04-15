DROP TABLE IF EXISTS posts;

CREATE TABLE posts (id SERIAL, title TEXT, content TEXT, likes INT);

INSERT INTO posts (title, content) VALUES (
	'First post',
  'First post content'
);

INSERT INTO posts (title, content) VALUES (
	'Second post',
  'Second post content'
);

INSERT INTO posts (title, content, likes) VALUES (
	'Third post',
  'Third post content',
  20
);
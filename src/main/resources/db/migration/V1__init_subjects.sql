-- 1. Типы цен
CREATE TABLE price_type (
                            id      SERIAL PRIMARY KEY,
                            name    TEXT UNIQUE NOT NULL
);

-- 2. Карточный текст
CREATE TABLE card_text (
                           id      SERIAL PRIMARY KEY,
                           text    TEXT
);

-- 3. Предметы (с колонкой title, сразу NOT NULL с DEFAULT)
CREATE TABLE subject (
                         id               SERIAL PRIMARY KEY,
                         name             TEXT        NOT NULL UNIQUE,
                         title            VARCHAR(255) NOT NULL DEFAULT '',      -- <— добавили с DEFAULT
                         start_text       TEXT        NOT NULL,
                         duration_text    TEXT        NOT NULL

);

-- 4. Цены предметов
CREATE TABLE subject_price (
                               id             SERIAL PRIMARY KEY,
                               subject_id     INT    REFERENCES subject(id) ON DELETE CASCADE,
                               price_type_id  INT    REFERENCES price_type(id),
                               tier           INT    CHECK (tier BETWEEN 1 AND 3),
                               amount         INT    NOT NULL
);

-- Заполнение справочников
INSERT INTO price_type(name) VALUES
                                 ('full'), ('monthly'), ('installment');

INSERT INTO card_text(text) VALUES
    ('Текст карточки курса');

-- Пример вставки предметов с title = name (или любой вашей логикой)
INSERT INTO subject(name, title, start_text, duration_text) VALUES
                                                                                               ('rus',  'Русский язык', '18 марта', '2.5 месяца'),
                                                                                               ('inf',  'Информатика','3 апреля',  '2 месяца'  ),
                                                                                               ('math', 'Математика','18 марта', '2.5 месяца'),
                                                                                               ('chem', 'Химия',     '21 марта', '2 месяца'),
                                                                                               ('bio',  'Биология',  '24 марта', '2.5 месяца');

-- И далее ваши INSERT INTO subject_price…

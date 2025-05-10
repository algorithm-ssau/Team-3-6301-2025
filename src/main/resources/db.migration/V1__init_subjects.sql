-- 1. Типы цен
CREATE TABLE price_type (
                            id SERIAL PRIMARY KEY,
                            name TEXT UNIQUE NOT NULL  -- например: full, monthly, installment
);

-- 2. Предметы
CREATE TABLE subject (
                         id SERIAL PRIMARY KEY,
                         name TEXT NOT NULL UNIQUE,
                         start_text TEXT NOT NULL,
                         duration_text TEXT NOT NULL,
                         duration_number NUMERIC NOT NULL,
                         card_text_id INT REFERENCES card_text(id)
);

-- 3. Цены предметов
CREATE TABLE subject_price (
                               id SERIAL PRIMARY KEY,
                               subject_id INT REFERENCES subject(id) ON DELETE CASCADE,
                               price_type_id INT REFERENCES price_type(id),
                               tier INT CHECK (tier BETWEEN 1 AND 3),
                               amount INT NOT NULL
);

-- 4. Карточный текст (если общий)
CREATE TABLE card_text (
                           id SERIAL PRIMARY KEY,
                           text TEXT
);
INSERT INTO price_type (name) VALUES
                                  ('full'), ('monthly'), ('installment');

INSERT INTO card_text (text) VALUES
    ('Текст карточки курса');  -- Замените при необходимости

-- Вставка предметов (используем card_text_id = 1)
INSERT INTO subject (name, start_text, duration_text, duration_number, card_text_id) VALUES
                                                                                         ('rus', '18 марта', '2.5 месяца', 1, 1),
                                                                                         ('inf', '3 апреля', '2 месяца', 1, 1),
                                                                                         ('math', '18 марта', '2.5 месяца', 1, 1),
                                                                                         ('chem', '21 марта', '2 месяца', 1, 1),
                                                                                         ('bio', '24 марта', '2.5 месяца', 2.5, 1);
-- Пример для rus:
-- Получим subject_id и price_type_id при необходимости через SELECT

-- rus
INSERT INTO subject_price (subject_id, price_type_id, tier, amount) VALUES
                                                                        (1, 1, 1, 9860), (1, 1, 2, 13770), (1, 1, 3, 16760), -- full
                                                                        (1, 2, 1, 4290), (1, 2, 2, 5990), (1, 2, 3, 7290),   -- monthly
                                                                        (1, 3, 1, 9860), (1, 3, 2, 13770), (1, 3, 3, 16760); -- installment

-- inf
INSERT INTO subject_price (subject_id, price_type_id, tier, amount) VALUES
                                                                        (2, 1, 1, 7695), (2, 1, 2, 10745), (2, 1, 3, 13075),
                                                                        (2, 2, 1, 4290), (2, 2, 2, 5990), (2, 2, 3, 7290),
                                                                        (2, 3, 1, 7695), (2, 3, 2, 10745), (2, 3, 3, 13075);

-- и так далее по аналогии для остальных предметов

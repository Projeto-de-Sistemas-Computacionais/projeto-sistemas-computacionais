INSERT INTO restricao (id, nome, descricao) VALUES (1, 'Sem Glúten', 'Alimentos sem glúten');
INSERT INTO restricao (id, nome, descricao) VALUES (2, 'Vegano', 'Sem ingredientes de origem animal');
INSERT INTO restricao (id, nome, descricao) VALUES (3, 'Sem Lactose', 'Alimentos sem lactose');
INSERT INTO restricao (id, nome, descricao) VALUES (4, 'Sem Açúcar', 'Alimentos sem adição de açúcar');
INSERT INTO restricao (id, nome, descricao) VALUES (5, 'Baixo Sódio', 'Alimentos com baixo teor de sódio');

INSERT INTO endereco (id, rua, numero, cidade, estado, cep) VALUES (1, 'Rua das Flores', '123', 'São Paulo', 'SP', '01000-000');
INSERT INTO endereco (id, rua, numero, cidade, estado, cep) VALUES (2, 'Av. Central', '456', 'Rio de Janeiro', 'RJ', '20000-000');
INSERT INTO endereco (id, rua, numero, cidade, estado, cep) VALUES (3, 'Rua do Sol', '789', 'Belo Horizonte', 'MG', '30000-000');
INSERT INTO endereco (id, rua, numero, cidade, estado, cep) VALUES (4, 'Travessa Verde', '321', 'Curitiba', 'PR', '80000-000');

INSERT INTO usuario (id, nome_completo, email, senha, id_endereco) VALUES (1, 'João', 'joao@email.com', '1234', 1);
INSERT INTO usuario (id, nome_completo, email, senha, id_endereco) VALUES (2, 'Maria', 'maria@email.com', 'abcd', 2);
INSERT INTO usuario (id, nome_completo, email, senha, id_endereco) VALUES (3, 'Carlos', 'carlos@email.com', 'senha321', 3);
INSERT INTO usuario (id, nome_completo, email, senha, id_endereco) VALUES (4, 'Ana', 'ana@email.com', 'ana123', 4);

INSERT INTO usuario_restricao (id_usuario, id_restricao) VALUES (1, 1);
INSERT INTO usuario_restricao (id_usuario, id_restricao) VALUES (2, 2);
INSERT INTO usuario_restricao (id_usuario, id_restricao) VALUES (2, 3);
INSERT INTO usuario_restricao (id_usuario, id_restricao) VALUES (3, 2);
INSERT INTO usuario_restricao (id_usuario, id_restricao) VALUES (3, 4);
INSERT INTO usuario_restricao (id_usuario, id_restricao) VALUES (4, 5);

INSERT INTO restaurante (id, nome, email, senha, imagem, id_endereco) VALUES (1, 'Restaurante Natural', 'natural@email.com', 'senha123', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYiYtMa1V_mt4f0aKie4E48i28hH1grFZ_XQ&s', 1);
INSERT INTO restaurante (id, nome, email, senha, imagem, id_endereco) VALUES (2, 'Veg e Tal', 'vegetal@email.com', 'senha456', 'https://www.folhaviagem.com.br/blogs/wp-content/uploads/2023/02/Quinta-Natural-Fachada-Monica-Quinta.jpg', 2);
INSERT INTO restaurante (id, nome, email, senha, imagem, id_endereco) VALUES (3, 'Casa Saudável', 'casa@email.com', '123casa', 'https://img.freepik.com/fotos-premium/restaurante-organico-decorado-com-plantas-verdes_731930-4741.jpg', 3);
INSERT INTO restaurante (id, nome, email, senha, imagem, id_endereco) VALUES (4, 'Green Food', 'green@email.com', 'greenpass', 'https://www.sabornamesa.com.br/media/k2/items/cache/4cd2db3b130a9a7a25962abef2ecad8e_XL.jpg', 4);

INSERT INTO restaurante_restricao (id_restaurante, id_restricao) VALUES (1, 1);
INSERT INTO restaurante_restricao (id_restaurante, id_restricao) VALUES (1, 3);
INSERT INTO restaurante_restricao (id_restaurante, id_restricao) VALUES (2, 2);
INSERT INTO restaurante_restricao (id_restaurante, id_restricao) VALUES (3, 2);
INSERT INTO restaurante_restricao (id_restaurante, id_restricao) VALUES (3, 4);
INSERT INTO restaurante_restricao (id_restaurante, id_restricao) VALUES (4, 1);
INSERT INTO restaurante_restricao (id_restaurante, id_restricao) VALUES (4, 5);

INSERT INTO tipo (id, descricao) VALUES (1, 'Arroz');
INSERT INTO tipo (id, descricao) VALUES (2, 'Feijão');
INSERT INTO tipo (id, descricao) VALUES (3, 'Tofu');
INSERT INTO tipo (id, descricao) VALUES (4, 'Alho');
INSERT INTO tipo (id, descricao) VALUES (5, 'Batata');
INSERT INTO tipo (id, descricao) VALUES (6, 'Cenoura');
INSERT INTO tipo (id, descricao) VALUES (7, 'Espinafre');
INSERT INTO tipo (id, descricao) VALUES (8, 'Azeite');
INSERT INTO tipo (id, descricao) VALUES (9, 'Grão-de-bico');
INSERT INTO tipo (id, descricao) VALUES (10, 'Tomate');

INSERT INTO receita (id, titulo, tempo_preparo, porcoes, nivel_dificuldade, descricao, modo_preparo, id_usuario) VALUES (1, 'Tofu Grelhado', 20, 2, 'Fácil', 'Receita saudável de tofu grelhado', 'Corte o tofu, tempere e grelhe.', 2);
INSERT INTO receita (id, titulo, tempo_preparo, porcoes, nivel_dificuldade, descricao, modo_preparo, id_usuario) VALUES (2, 'Arroz com Feijão', 30, 4, 'Médio', 'Clássico brasileiro', 'Cozinhe o arroz e o feijão separadamente.', 1);
INSERT INTO receita (id, titulo, tempo_preparo, porcoes, nivel_dificuldade, descricao, modo_preparo, id_usuario) VALUES (3, 'Salada de Grão-de-bico', 15, 2, 'Fácil', 'Salada nutritiva e vegana', 'Cozinhe o grão-de-bico e misture com legumes.', 3);
INSERT INTO receita (id, titulo, tempo_preparo, porcoes, nivel_dificuldade, descricao, modo_preparo, id_usuario) VALUES (4, 'Sopa', 25, 3, 'Médio', 'Sopa leve para o jantar', 'Refogue tudo, bata no liquidificador e sirva quente.', 4);

INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (1, 3);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (1, 4);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (2, 1);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (2, 2);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (3, 9);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (3, 10);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (4, 6);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (4, 7);
INSERT INTO receita_tipo (id_receita, id_tipo) VALUES (4, 8);

INSERT INTO receita_usuario_favoritar (id_receita, id_usuario) VALUES (1, 1);
INSERT INTO receita_usuario_favoritar (id_receita, id_usuario) VALUES (2, 2);
INSERT INTO receita_usuario_favoritar (id_receita, id_usuario) VALUES (3, 1);
INSERT INTO receita_usuario_favoritar (id_receita, id_usuario) VALUES (4, 3);

INSERT INTO produto_imagens (produto_id, imagem) VALUES (1, 'https://www.oitedi.com.br/_next/image?url=https%3A%2F%2Ftedi-production.s3.amazonaws.com%2Fcooking_recipes%2Ffood_description%2Ffaf10c29ba274147c6268b2782bdbee34e35e7fd.png&w=1080&q=70');
INSERT INTO produto_imagens (produto_id, imagem) VALUES (2, 'https://blog.alelo.com.br/wp-content/uploads/2024/02/feijao-preto-e-prato-de-arroz.jpeg');
INSERT INTO produto_imagens (produto_id, imagem) VALUES (3, 'https://s2-receitas.glbimg.com/PPeYSYp-eDVsj5UphxJxTz8Z4x8=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/a/s/qsN6WGRjK6h9tdRv4kaw/salada-de-grao-de-bico.jpg');
INSERT INTO produto_imagens (produto_id, imagem) VALUES (4, 'https://semglutensemlactose.com/wp-content/uploads/2014/06/sopa-de-mandioquinha_spa.jpg');

INSERT INTO receita_restricao (id_receita, id_restricao) VALUES (1, 2);
INSERT INTO receita_restricao (id_receita, id_restricao) VALUES (1, 3);
INSERT INTO receita_restricao (id_receita, id_restricao) VALUES (2, 1);
INSERT INTO receita_restricao (id_receita, id_restricao) VALUES (3, 2);
INSERT INTO receita_restricao (id_receita, id_restricao) VALUES (3, 4);
INSERT INTO receita_restricao (id_receita, id_restricao) VALUES (4, 5);

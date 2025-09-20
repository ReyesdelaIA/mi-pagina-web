-- Script para insertar archivos manualmente en la base de datos
-- Ejecutar en Railway o localmente

INSERT INTO files (name, description, filename, size, createdAt) VALUES 
('3 reglas de oro para un buen Prompt', 'Manual esencial con las 3 reglas fundamentales para crear prompts efectivos que generen resultados excepcionales', '3-reglas-oro-prompt.pdf', 1024000, CURRENT_TIMESTAMP),
('5 Prompts poderosos para cambiar tu logo', 'Colección de prompts especializados para rediseñar y mejorar logos usando inteligencia artificial', '5-prompts-logo.pdf', 856000, CURRENT_TIMESTAMP),
('Paso a paso para CustomGPT', 'Guía completa para crear tu propio GPT personalizado desde cero, con ejemplos prácticos', 'paso-paso-customgpt.pdf', 1200000, CURRENT_TIMESTAMP);

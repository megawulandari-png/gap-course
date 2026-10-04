insert into students (name,grade,school,subject,rate,access_code) values
('Pandanwangi','Grade 9','SMPN 8 Yogyakarta','English',150000,'PW0901'),
('Alya','Grade 8','SMP Negeri 15 Yogyakarta','English',125000,'AL0802'),
('Raka','Grade 10','Cambridge Program','Chemistry',200000,'RK1003')
on conflict (access_code) do nothing;

insert into sessions (code,session_date,subject,topic,tutor_name,status,opens_at,closes_at) values
('ENG9-OCT04','2026-10-04','English','Reading comprehension & vocabulary','Mega Ayu Wulandari','open',now() - interval '1 hour',now() + interval '1 day'),
('CHEM10-OCT05','2026-10-05','Chemistry','Chemical formulae and equations','Tutor','scheduled',null,null)
on conflict (code) do nothing;

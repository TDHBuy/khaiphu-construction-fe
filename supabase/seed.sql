with new_project as (
  insert into projects(slug,title_vi,title_en,description_vi,description_en,service_type,location,location_en,main_contractor,main_contractor_en,general_contractor,general_contractor_en,specifications,specifications_en)
  values('du-an-larcade-c12b-2',
  'DỰ ÁN L''ARCADE C12B-2',
  'L''ARCADE C12B-2 PROJECT',
  'Lắp dựng & tháo dỡ hệ shoring',
  'Shoring system installation & dismantling',
  '{shoring}',
  'QUẬN 7 - TPHCM',
  'DISTRICT 7 - TPHCM',
  'CÔNG TY TNHH MTV THÉP PHÚ THẮNG/ CÔNG TY TNHH XDTM BẢO BÌNH PHÁT',
  'PHU THANG STEEL COMPANY LIMITED/ BAO BINH PHAT TRADING CONSTRUCTION COMPANY LIMITED',
  'CÔNG TY TNHH TẬP ĐOÀN XÂY DỰNG DELTA',
  'DELTA CONSTRUCTION GROUP CO., LTD.',
  '[{"label":"HỆ GIẰNG CHỐNG (SHORING)", "quantity":200, "unit":"tấn"}]'::jsonb,
  '[{"label":"SHORING SYSTEM","quantity":200,"unit":"tons"}]'::jsonb)
  returning id
)
insert into project_images(project_id, url, "order",is_cover, alt_text)
select
  new_project.id,
  unnest(array[
    'https://bdzstvovphqcghcojawy.supabase.co/storage/v1/object/sign/project-images/C12B_PhuMyHung/PMH_02.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYTVlMjJhYS0wNTA2LTQ3MzQtYTdmZS1hNTc4MTg2MmRjYzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LWltYWdlcy9DMTJCX1BodU15SHVuZy9QTUhfMDIuSlBHIiwiaWF0IjoxNzc5NjIzODAwLCJleHAiOjE4MTExNTk4MDB9.IeTraAI2UR5ENJvFe8rvyq-UpMJekdEkcORm69hrrxE',
    'https://bdzstvovphqcghcojawy.supabase.co/storage/v1/object/sign/project-images/C12B_PhuMyHung/PMH_01.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYTVlMjJhYS0wNTA2LTQ3MzQtYTdmZS1hNTc4MTg2MmRjYzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LWltYWdlcy9DMTJCX1BodU15SHVuZy9QTUhfMDEuSlBHIiwiaWF0IjoxNzc5NjIzODIyLCJleHAiOjE4MTExNTk4MjJ9.CpC5EO4kgYMDGLI_U-44MXjOzLm1k6LRqHgtH34xtbw'
  ]
  ),
  generate_series(0,1),
  unnest(array[true,false]),
  unnest(array['c12b_image_cover','c12b_image'])
from new_project;


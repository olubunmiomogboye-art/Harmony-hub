-- HARMONY HUB — SUPABASE INITIAL SEED SCRIPT
-- 36 Products across 4 categories

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'quality-smp-food-storage-container', 'Quality SMP Food Storage Container', 'quality-smp-food-storage-container', '800 ML', 18000, 'Kitchen Utensils', 'kitchen-utensils', '/images/products/container.jpg', 'Durable food storage container with a tight clip-lock lid to keep food fresh.', 'A sturdy, airtight container that helps keep your pantry and fridge neat and organized. The secure clips prevent leaks and keep your food, grains, or snacks fresh for longer.', true, 20, true, true, 'Bestseller', ARRAY['800 ML']::text[], '[]'::jsonb, '[{"label":"Capacity","value":"800 ML"},{"label":"Material","value":"BPA-Free Food Grade Polymer"},{"label":"Closure","value":"4-Way Airtight Clip Lock"},{"label":"Safe For","value":"Microwave, Dishwasher, Freezer"}]'::jsonb, null, '2026-10-21T10:00:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'sports-water-bottle-carry-handle', 'Sports Water Bottle with Carry Handle', 'sports-water-bottle-carry-handle', 'Keeps hot and cold liquid', 20000, 'Kitchen Utensils', 'kitchen-utensils', '/images/products/utensils-set.jpg', 'Insulated stainless steel sports bottle with convenient carry handle.', 'High-grade vacuum insulated sports water bottle engineered with an ergonomic carry handle. Retains beverage temperature for up to 24 hours cold or 12 hours hot.', true, 15, true, false, null, ARRAY['750 ML', '1000 ML']::text[], '[{"name":"Emerald Green","hex":"#183C32"},{"name":"Matte Black","hex":"#1E1E1E"},{"name":"Rose Gold","hex":"#B76E79"}]'::jsonb, '[{"label":"Insulation","value":"Double-Wall Vacuum"},{"label":"Temperature Hold","value":"24h Cold / 12h Hot"},{"label":"Feature","value":"Leakproof Lid with Handle"}]'::jsonb, 'Original Figma price text contained an additional ''not'' (₦20,000).', '2026-10-21T10:05:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'stainless-steel-cutlery-set-24pcs', 'Stainless Steel Cutlery Set', 'stainless-steel-cutlery-set-24pcs', '24 pcs', 30000, 'Kitchen Utensils', 'kitchen-utensils', '/images/products/utensils-set.jpg', 'Mirror-finish 24-piece stainless steel family dining cutlery set.', 'Premium 24-piece mirror-polished food-grade stainless steel cutlery set comprising dinner knives, dinner forks, tablespoons, and dessert teaspoons.', true, 12, true, false, null, ARRAY['24 Pieces']::text[], '[{"name":"Silver Chrome","hex":"#D4D4D8"},{"name":"Champagne Gold","hex":"#E5C158"}]'::jsonb, '[{"label":"Set Count","value":"24 Pieces"},{"label":"Material","value":"18/10 Stainless Steel"},{"label":"Finish","value":"High-Gloss Mirror Polish"}]'::jsonb, 'Original Figma price text contained an additional ''not'' (₦30,000).', '2026-10-21T10:10:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'glass-food-storage-dish-one-set', 'Glass Food Storage Dish One Set', 'glass-food-storage-dish-one-set', '3 pieces', 25000, 'Kitchen Utensils', 'kitchen-utensils', '/images/products/container.jpg', 'Heat-resistant borosilicate glass dish set with snap-tight lids.', 'Three durable borosilicate glass containers with leakproof snap-lock lids that transition seamlessly from freezer to oven and microwave straight to table.', true, 14, true, false, null, ARRAY['Small (400ml)', 'Medium (800ml)', 'Large (1.5L)']::text[], '[]'::jsonb, '[{"label":"Pieces","value":"3 Containers + 3 Airtight Lids"},{"label":"Glass Type","value":"Oven-Safe Borosilicate"},{"label":"Thermal Shock","value":"Safe Up to 400°C"}]'::jsonb, null, '2026-10-21T10:15:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'container-grater-with-storage-bowl', 'Container Grater with Storage Bowl', 'container-grater-with-storage-bowl', 'With Storage Bowl', 15000, 'Kitchen Utensils', 'kitchen-utensils', '/images/products/container.jpg', 'Stainless steel blade grater with integrated storage basin.', 'Multi-purpose stainless steel box grater with fitted catch-basin storage container to catch shredded cheese, carrots, and vegetables without mess.', true, 16, true, false, null, ARRAY['Standard Bowl (1.2L)']::text[], '[]'::jsonb, '[{"label":"Blade Types","value":"Coarse, Fine, Slicer, Ribbon"},{"label":"Base","value":"Non-Slip Silicone Rim"}]'::jsonb, 'Figma description originally read ''Comfortable and cute'' (mismatched placeholder text from baby set). Updated with culinary description.', '2026-10-21T10:20:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'cussons-baby-soap-mild-gentle', 'Cussons Baby Soap, Mild & Gentle', 'cussons-baby-soap-mild-gentle', '75g', 500, 'Baby Things', 'baby-things', '/images/products/cussons-soap.jpg', 'Gentle moisturizing baby soap enriched with chamomile extract.', 'A trusted, mild soap specially made for your baby''s delicate skin. Cleanses gently with chamomile and milk extracts to keep baby soft, fresh, and comfortable.', true, 65, true, true, 'Essential', ARRAY['75g']::text[], '[]'::jsonb, '[{"label":"Net Weight","value":"75g"},{"label":"Skin Type","value":"Sensitive & Newborn Skin"},{"label":"Key Ingredients","value":"Chamomile & Milk Extract"}]'::jsonb, null, '2026-10-21T10:25:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'mens-corporate-classy-shoes', 'Men’s Corporate Classy Shoes', 'mens-corporate-classy-shoes', 'Size 41–44 — Black', 25000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Sophisticated corporate formal dress shoes for modern professionals.', 'Polished gentleman''s corporate dress shoes crafted with premium leather finish, padded inner soles, and durable slip-resistant outsoles.', true, 10, true, true, null, ARRAY['41', '42', '43', '44']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[{"label":"Upper Material","value":"Polished Synthetic Leather"},{"label":"Sole","value":"Non-Slip Anti-Shock Rubber"}]'::jsonb, null, '2026-10-21T10:30:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'timberland-style-casual-boots', 'Timberland-Style Casual Boots for Adults and Kids', 'timberland-style-casual-boots', 'Sizes 31, 36, 37, 41, 42, 46', 15000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Classic nubuck-style casual boots with cushioned support.', 'Rugged yet stylish lace-up ankle boots with padded collar and deep-tread lugged rubber soles for all-weather traction and casual streetwear flair.', true, 18, true, false, null, ARRAY['31', '36', '37', '41', '42', '46']::text[], '[{"name":"Wheat Camel","hex":"#C19A6B"},{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T10:35:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'toryburch-casual-sandals-men', 'ToryBurch Casual Sandals for Men', 'toryburch-casual-sandals-men', 'Black, Brown, Ash — Sizes 40–44', 10000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Lightweight leather slide sandals for casual weekend relaxation.', 'Comfort-crafted leather slide sandals featuring supportive arched footbeds and embossed designer strap details. Ideal for relaxed weekends.', true, 15, true, false, null, ARRAY['40', '41', '42', '43', '44']::text[], '[{"name":"Black","hex":"#111111"},{"name":"Brown","hex":"#6E4720"},{"name":"Ash","hex":"#A0A0A0"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T10:40:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'nike-air-force-1-sneakers-unisex', 'Nike Air Force 1 Sneakers (Unisex)', 'nike-air-force-1-sneakers-unisex', 'Sizes 42–47', 22000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Timeless low-profile leather sneakers with cushioned sole.', 'Iconic streetwear low-top sneakers with supple leather uppers, perforated toe boxes, and encapsulating air-sole cushioning.', true, 12, true, true, 'Popular', ARRAY['42', '43', '44', '45', '46', '47']::text[], '[{"name":"Triple White","hex":"#FFFFFF"},{"name":"Triple Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T10:45:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'football-design-casual-sneakers', 'Football-Design Casual Sneakers', 'football-design-casual-sneakers', 'Sizes 38–42', 18000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Athletic lifestyle sneakers with low-profile sole.', 'Sporty casual sneakers inspired by athletic soccer silhouettes with textured side paneling and responsive flexible soles.', true, 9, true, false, null, ARRAY['38', '39', '40', '41', '42']::text[], '[{"name":"White & Black","hex":"#FFFFFF"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T10:50:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'mens-casual-slip-on-shoes-funci', 'Men’s Casual Slip-On Shoes (Funci)', 'mens-casual-slip-on-shoes-funci', 'Leather, Black', 30000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Handcrafted black leather slip-ons with driving sole.', 'Handcrafted Funci leather slip-on loafers boasting supple genuine leather texture, flexible driving soles, and luxurious gold saddle detail.', true, 8, true, false, null, ARRAY['40', '41', '42', '43', '44', '45']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T10:55:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'female-adult-boyfriend-corporate-shoe', 'Female Adult Boyfriend Corporate Shoe', 'female-adult-boyfriend-corporate-shoe', 'Size to be confirmed', 15000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Tailored boyfriend brogue corporate shoe for modern women.', 'Chic masculine-inspired tailored corporate brogues with understated stitch trims and low stacked heels.', true, 7, true, false, null, ARRAY['To be confirmed']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, 'Size to be confirmed by owner.', '2026-10-21T11:00:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'mens-fashion-casual-sneakers-white-sole', 'Men’s Fashion Casual Sneakers with White Sole', 'mens-fashion-casual-sneakers-white-sole', 'Sizes 41–46', 15000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Casual everyday lace-up sneaker on clean white rubber sole.', 'Modern minimalist lace-up sneakers contrasting a sleek upper against clean vulcanized white platform cup-soles.', true, 14, true, false, null, ARRAY['41', '42', '43', '44', '45', '46']::text[], '[{"name":"Black / White Sole","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:05:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'mens-casual-slip-on-shoes', 'Men’s Casual Slip-On Shoes', 'mens-casual-slip-on-shoes', 'Sizes 40–46', 25000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Comfortable men''s daily slip-ons with cushioned footbed.', 'Effortless slip-on leisure shoes with elastic side gussets for easy on-and-off and padded ankle collars.', true, 11, true, false, null, ARRAY['40', '41', '42', '43', '44', '45', '46']::text[], '[{"name":"Black","hex":"#111111"},{"name":"Brown","hex":"#6E4720"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:10:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'clarks-casual-shoes-adult-men', 'Clarks Casual Shoes for Adult Men', 'clarks-casual-shoes-adult-men', 'Sizes 41–46', 33000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Comfort-engineered casual derby shoes with ultra-light sole.', 'Signature Clarks-style lightweight casual derby shoes engineered with cushioned EVA midsoles and breathable suede-leather uppers.', true, 10, true, false, null, ARRAY['41', '42', '43', '44', '45', '46']::text[], '[{"name":"Tan Brown","hex":"#96552B"},{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:15:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'nike-black-sneakers', 'Nike Black Sneakers', 'nike-black-sneakers', 'Available in white — Sizes 41 and 42', 15000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Sleek black sports-casual sneakers with flexible sole.', 'Low-profile lightweight running and lifestyle sneakers offering flexible foam cushioning and breathable mesh panels.', true, 6, true, false, null, ARRAY['41', '42']::text[], '[{"name":"Black","hex":"#111111"},{"name":"White","hex":"#FFFFFF"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:20:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'gino-ventini-leather-moq-mens-shoe', 'Gino Ventini Leather MOQ Men’s Shoe', 'gino-ventini-leather-moq-mens-shoe', 'Sizes 40–44 — Black', 25000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Gino Ventini MOQ corporate gentleman''s formal shoe.', 'Italian-styled Gino Ventini MOQ executive shoes featuring rich burnished leather, leather insole lining, and tailored silhouette.', true, 7, true, false, null, ARRAY['40', '41', '42', '43', '44']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:25:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'gino-ventini-leather-mens-shoe', 'Gino Ventini Leather Men’s Shoe', 'gino-ventini-leather-mens-shoe', 'Sizes 40–44 — Black', 25000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Gino Ventini classic leather oxford shoes.', 'Classic Gino Ventini formal oxfords with clean welt stitching and high-shine polished leather uppers.', true, 8, true, false, null, ARRAY['40', '41', '42', '43', '44']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:30:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'womens-and-kids-black-casual-loafers', 'Women’s and Kids’ Black Casual Loafers', 'womens-and-kids-black-casual-loafers', 'Sizes 37 and 42 available', 7000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Everyday black casual loafers with comfortable fit.', 'Versatile slip-on loafers suitable for both women and teens, tailored with supple faux leather and cushioned footbed.', true, 5, true, false, null, ARRAY['37', '42']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:35:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'royal-classy-shoe-for-adult-men', 'Royal Classy Shoe for Adult Men', 'royal-classy-shoe-for-adult-men', 'Sizes 40–45', 35000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Luxury embossed leather formal shoe for special occasions.', 'Opulent royal corporate dress shoe tailored with embossed textured calfskin leather, gold buckle accents, and hand-finished sole edge.', true, 6, true, true, 'Exclusive', ARRAY['40', '41', '42', '43', '44', '45']::text[], '[{"name":"Rich Mahogany","hex":"#4C1C17"},{"name":"Midnight Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:40:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'ladies-stylish-classy-crossed-open-toe-sandal', 'Ladies’ Stylish Classy Crossed Open-Toe Sandal', 'ladies-stylish-classy-crossed-open-toe-sandal', 'Sizes 40–45 — Black, brown, blue, ash', 12000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Criss-cross strap ladies'' open-toe casual dress sandal.', 'Elegant criss-cross strap open-toe sandals designed with soft footbed cushioning and subtle block heel support.', true, 16, true, false, null, ARRAY['40', '41', '42', '43', '44', '45']::text[], '[{"name":"Black","hex":"#111111"},{"name":"Brown","hex":"#6E4720"},{"name":"Blue","hex":"#1D4ED8"},{"name":"Ash","hex":"#A0A0A0"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:45:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'womens-corporate-loafers', 'Women’s Corporate Loafers', 'womens-corporate-loafers', 'Leather, Black', 12000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Polished black leather corporate loafers for women.', 'Smart leather corporate loafers with rounded toe and metallic keeper bar across the vamp for daily office elegance.', true, 10, true, false, null, ARRAY['37', '38', '39', '40', '41', '42']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T11:50:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'womens-chunky-sole-loafers-bow-detail', 'Women’s Chunky Sole Loafers with Bow Detail', 'womens-chunky-sole-loafers-bow-detail', 'Chunky Sole', 25000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Trend-forward platform loafers with feminine bow embellishment.', 'Statement chunky platform sole loafers embellished with a tailored front bow accent and lugged sole.', true, 7, true, false, null, ARRAY['37', '38', '39', '40', '41']::text[], '[{"name":"Glossy Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, 'Figma description originally read ''3 pieces''. Replaced with footwear description.', '2026-10-21T11:55:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'womens-black-office-shoes-rope-bow', 'Women’s Black Office Shoes with Rope Bow', 'womens-black-office-shoes-rope-bow', 'Sizes 37, 38, 42, 43', 15000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Feminine office dress shoes with woven rope bow detail.', 'Classic black corporate court shoes accented with a delicate nautical rope bow motif on the vamp.', true, 8, true, false, null, ARRAY['37', '38', '42', '43']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:00:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'female-casual-black-shoe-for-adults', 'Female Casual Black Shoe for Adults', 'female-casual-black-shoe-for-adults', 'Sizes 36–42', 13000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Comfortable women''s daily casual walking shoes in black.', 'Low-heel daily casual black walking shoes featuring soft padded footbeds and non-slip tread.', true, 12, true, false, null, ARRAY['36', '37', '38', '39', '40', '41', '42']::text[], '[{"name":"Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:05:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'clarks-casual-slip-on-mens-shoe', 'Clark’s Casual Slip-On Men’s Shoe', 'clarks-casual-slip-on-mens-shoe', 'Size to be confirmed', 28000, 'Adults'' Fashion', 'adults-fashion', '/images/products/brown-dress.jpg', 'Men''s leather casual slip-on driving loafers.', 'Relaxed leather slip-on driving mocs engineered with flexible rubber outsoles and breathable footbed.', true, 9, true, false, null, ARRAY['To be confirmed']::text[], '[{"name":"Navy Blue","hex":"#1E3A8A"},{"name":"Cognac Brown","hex":"#78350F"}]'::jsonb, '[]'::jsonb, 'Size to be confirmed by owner.', '2026-10-21T12:10:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'pink-tulle-skirt-for-children', 'Pink Tulle Skirt for Children (Age 7–14)', 'pink-tulle-skirt-for-children', 'Available in 6 colours', 16000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Layered party tulle skirt with soft elastic waistband.', 'A fun, fluffy skirt designed for birthday parties, weddings, and celebrations. Made with soft tulle over a gentle cotton lining so your girl can play and dance in total comfort.', true, 16, true, true, 'Popular', ARRAY['7-8 Years', '9-10 Years', '11-12 Years', '13-14 Years']::text[], '[{"name":"Ballerina Pink","hex":"#F4C2C2"},{"name":"Powder Blue","hex":"#B0E0E6"},{"name":"Ivory White","hex":"#FFFFF0"},{"name":"Lavender","hex":"#E6E6FA"},{"name":"Peach","hex":"#FFDAB9"},{"name":"Mint Green","hex":"#98FF98"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:15:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'kids-casual-sneakers-with-bow-detail', 'Kids’ Casual Sneakers with Bow Detail', 'kids-casual-sneakers-with-bow-detail', 'Blue, Pink, Purple — Sizes 25, 30, 31, 36', 16000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Cute bow-embellished lightweight sneakers for kids.', 'Adorable children''s everyday lifestyle sneakers featuring decorative bow accents, easy velcro strap fasteners, and cushioned supportive soles.', true, 12, true, false, null, ARRAY['25', '30', '31', '36']::text[], '[{"name":"Blue","hex":"#3B82F6"},{"name":"Pink","hex":"#EC4899"},{"name":"Purple","hex":"#A855F7"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:20:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'kids-chunky-sole-sports-sneakers', 'Kids’ Chunky Sole Sports Sneakers', 'kids-chunky-sole-sports-sneakers', 'Sizes 38–42', 25000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Chunky sole sports trainers for older children and teens.', 'Youth streetwear chunky running sneakers equipped with shock-absorbing platform midsoles and high-grip rubber treads.', true, 8, true, false, null, ARRAY['38', '39', '40', '41', '42']::text[], '[{"name":"White & Metallic Grey","hex":"#E5E7EB"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:25:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'casual-sneakers-decorative-lace-detail', 'Casual Sneakers with Decorative Lace Detail', 'casual-sneakers-decorative-lace-detail', 'Sizes 25–36', 16000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Canvas casual sneakers with charming ribbon lace detail.', 'Playful children''s canvas sneakers adorned with decorative ribbon lace eyelets and reinforced rubber toe caps.', true, 15, true, false, null, ARRAY['25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']::text[], '[{"name":"Soft Pink","hex":"#FBCFE8"},{"name":"Crisp White","hex":"#FFFFFF"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:30:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'new-girls-dressing-shoe-children', 'New Girl’s Dressing Shoe for Children', 'new-girls-dressing-shoe-children', 'Sizes 21–25 — Black, pink, cream', 9000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Patent party dress shoes for young girls.', 'Charming formal occasion dress flats with glossy patent finish, cushioned inner sole, and secure ankle strap.', true, 14, true, false, null, ARRAY['21', '22', '23', '24', '25']::text[], '[{"name":"Black","hex":"#111111"},{"name":"Pink","hex":"#F472B6"},{"name":"Cream","hex":"#FEF3C7"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:35:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'girls-mary-jane-shoes-bow-strap', 'Girls’ Mary Jane Shoes with Bow and Strap', 'girls-mary-jane-shoes-bow-strap', 'Sizes 25, 30, 31, 36', 10000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Classic Mary Jane shoes with bow and strap for girls.', 'Timeless Mary Jane children''s party shoes with delicate front bow, padded insoles, and easy velcro closure.', true, 10, true, false, null, ARRAY['25', '30', '31', '36']::text[], '[{"name":"Patent Red","hex":"#DC2626"},{"name":"Classic Black","hex":"#111111"},{"name":"Pearl White","hex":"#F8FAFC"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:40:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'kids-unisex-soft-slide-sandals', 'Kids’ Unisex Soft Slide Sandals', 'kids-unisex-soft-slide-sandals', 'Sizes 20, 25, 26, 30, 31, 36', 8000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Lightweight cushioned EVA slide sandals for kids.', 'Ultra-comfortable one-piece EVA foam slide sandals with non-slip footbed and water-resistant finish.', true, 22, true, false, null, ARRAY['20', '25', '26', '30', '31', '36']::text[], '[{"name":"Sunny Yellow","hex":"#FACC15"},{"name":"Sky Blue","hex":"#38BDF8"},{"name":"Charcoal Grey","hex":"#374151"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:45:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'kids-brown-leather-school-shoes', 'Kids’ Brown Leather School Shoes', 'kids-brown-leather-school-shoes', 'Sizes 25–42', 15000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Durable brown leather formal school shoes for children.', 'Heavy-duty genuine leather children''s school shoes built with scuff-resistant toe guards, padded collars, and flexible soles.', true, 18, true, false, null, ARRAY['25-30', '31', '36', '37-42']::text[], '[{"name":"School Brown","hex":"#5C3A21"}]'::jsonb, '[]'::jsonb, null, '2026-10-21T12:50:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.products (
  id, name, slug, subtitle, price, category, category_slug, image, short_description, description, in_stock, stock_count, is_published, featured, badge, sizes, colors, specs, flagged_note, created_at, updated_at
) values (
  'naked-wolfe-kids-casual-shoes-chunky-sole', 'Naked Wolfe Kids’ Casual Shoes with Chunky Sole', 'naked-wolfe-kids-casual-shoes-chunky-sole', 'Chunky Sole', 25000, 'Children''s Outfits', 'childrens-outfits', '/images/products/tulle-skirt.jpg', 'Trendy designer-style chunky sneakers for kids.', 'Bold fashion-forward sneakers with chunky multi-layered sculpted soles and padded tongue for standout youthful styling.', true, 7, true, false, null, ARRAY['30', '31', '32', '33', '34', '35', '36']::text[], '[{"name":"Triple White","hex":"#FFFFFF"},{"name":"White & Black","hex":"#111111"}]'::jsonb, '[]'::jsonb, 'Figma description originally read ''3 pieces''. Replaced with footwear description.', '2026-10-21T12:55:00Z', '2026-11-02T12:00:00Z'
) on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  category_slug = excluded.category_slug,
  image = excluded.image,
  in_stock = excluded.in_stock,
  is_published = excluded.is_published,
  updated_at = now();


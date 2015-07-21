all: template.html fotos.html noticia.html androitor.html resume.html
%.html: %.pre.html footer.css footer.html
	cpp -I./ -P $< -o $@

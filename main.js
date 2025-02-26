const { createApp, ref } = Vue;
const Dexie = window.Dexie;
const db = new Dexie('db_academico');

db.version(1).stores({
    autores: '++idAutor, nombre, pais',
    libros: '++idLibro, titulo, editorial'
});

const app = createApp({
    data() {
        return {
            forms: {
                autor: { mostrar: false },
                libro: { mostrar: false }
            },
            autores: [],
            libros: [],
            formAutor: { idAutor: null, nombre: "", pais: "" },
            formLibro: { idLibro: null, titulo: "", editorial: "" },
            editandoAutor: false,
            editandoLibro: false
        };
    },
    methods: {
        async cargarAutores() {
            this.autores = await db.autores.toArray();
        },
        async cargarLibros() {
            this.libros = await db.libros.toArray();
        },
        abrirFormulario(tipo) {
            this.forms[tipo].mostrar = true;
            if (tipo === 'autor') {
                this.formAutor = { idAutor: null, nombre: "", pais: "" };
                this.editandoAutor = false;
            } else {
                this.formLibro = { idLibro: null, titulo: "", editorial: "" };
                this.editandoLibro = false;
            }
        },
        cerrarFormulario(tipo) {
            this.forms[tipo].mostrar = false;
        },
        async guardarAutor() {
            if (this.editandoAutor) {
                await db.autores.put(this.formAutor);
            } else {
                await db.autores.add({ nombre: this.formAutor.nombre, pais: this.formAutor.pais });
            }
            this.cargarAutores();
            this.cerrarFormulario('autor');
        },
        async guardarLibro() {
            if (this.editandoLibro) {
                await db.libros.put(this.formLibro);
            } else {
                await db.libros.add({ titulo: this.formLibro.titulo, editorial: this.formLibro.editorial });
            }
            this.cargarLibros();
            this.cerrarFormulario('libro');
        },
        editarAutor(autor) {
            this.formAutor = { ...autor };
            this.editandoAutor = true;
            this.abrirFormulario('autor');
        },
        editarLibro(libro) {
            this.formLibro = { ...libro };
            this.editandoLibro = true;
            this.abrirFormulario('libro');
        },
        async eliminarAutor(id) {
            await db.autores.delete(id);
            this.cargarAutores();
        },
        async eliminarLibro(id) {
            await db.libros.delete(id);
            this.cargarLibros();
        }
    },
    mounted() {
        this.cargarAutores();
        this.cargarLibros();
    }
});

app.mount('#app');

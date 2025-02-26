app.component('libro', {
    template: `
    <div>
        <h3>Formulario Libro</h3>
        <input v-model="libro.isbn" placeholder="ISBN">
        <input v-model="libro.titulo" placeholder="Título">
        <input v-model="libro.editorial" placeholder="Editorial">
        <input v-model="libro.edicion" placeholder="Edición">
        <button @click="guardarLibro">Guardar</button>
    </div>
    `,
    data() {
        return {
            libro: { idLibro: null, isbn: '', titulo: '', editorial: '', edicion: '' }
        };
    },
    methods: {
        cargarDatos(datos) {
            this.libro = { ...datos };
        },
        async guardarLibro() {
            if (this.libro.idLibro) {
                await db.libros.put(this.libro); // Modifica
            } else {
                await db.libros.add(this.libro); // Agrega nuevo
            }
            this.$emit('actualizarLista');
            this.limpiarFormulario();
        },
        limpiarFormulario() {
            this.libro = { idLibro: null, isbn: '', titulo: '', editorial: '', edicion: '' };
        }
    }
});

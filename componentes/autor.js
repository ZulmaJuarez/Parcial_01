app.component('autor', {
    template: `
    <div>
        <h3>Formulario Autor</h3>
        <input v-model="autor.codigo" placeholder="Código">
        <input v-model="autor.nombre" placeholder="Nombre">
        <input v-model="autor.pais" placeholder="País">
        <input v-model="autor.telefono" placeholder="Teléfono">
        <button @click="guardarAutor">Guardar</button>
    </div>
    `,
    data() {
        return {
            autor: { idAutor: null, codigo: '', nombre: '', pais: '', telefono: '' }
        };
    },
    methods: {
        cargarDatos(datos) {
            this.autor = { ...datos };
        },
        async guardarAutor() {
            if (this.autor.nombre.trim() === '' || this.autor.pais.trim() === '') {
                alert('Completa todos los campos');
                return;
            }
            if (this.autor.idAutor) {
                await db.autores.put(this.autor);
            } else {
                await db.autores.add(this.autor);
            }
            this.$emit('actualizarLista');
            this.limpiarFormulario();
        },
        limpiarFormulario() {
            this.autor = { idAutor: null, codigo: '', nombre: '', pais: '', telefono: '' };
        }
    }
});

import { useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

type ImageUploaderProps = {
  /** Slug del producto para nombrar el archivo. */
  slug: string;
  /** Imagen actual (si existe). */
  currentImage?: string;
  /** Callback con la URL final de la imagen. */
  onChange: (imagePath: string | undefined) => void;
};

/**
 * Componente para subir la foto real del producto con drag & drop.
 *
 * Nota técnica: Como esta es una app sin backend, la imagen se convierte a
 * data URL y se guarda en localStorage junto con el producto. Cuando se
 * conecte un backend real, basta con cambiar `handleFile` para hacer
 * POST multipart a la API y guardar `/images/products/<slug>.jpg`.
 *
 * La interfaz visual NO cambia: el admin arrastra o selecciona, ve preview,
 * y puede quitar la imagen. La lógica de persistencia queda aislada.
 */
export default function ImageUploader({
  slug,
  currentImage,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);

    // Validar tipo.
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen.");
      return;
    }
    // Validar tamaño (max 2 MB para localStorage).
    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen es muy pesada (máx 2 MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.onerror = () => setError("No se pudo leer el archivo.");
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  const slugOrId = slug || "producto";

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Foto del producto
      </label>

      {preview ? (
        /* Preview con opción de quitar */
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 group">
          <img
            src={preview}
            alt={`Preview de ${slugOrId}`}
            className="w-full aspect-[4/3] object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-9 h-9 bg-white rounded-lg shadow flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
            aria-label="Quitar imagen"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white text-xs flex items-center gap-1">
              <Upload size={12} /> Imagen cargada correctamente
            </p>
          </div>
        </div>
      ) : (
        /* Dropzone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            dragging
              ? "border-primary bg-primary-light scale-[1.02]"
              : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
          }`}
        >
          <div className="w-14 h-14 mx-auto mb-3 bg-primary-light rounded-2xl flex items-center justify-center">
            <ImagePlus className="text-primary" size={26} />
          </div>
          <p className="font-medium text-sm text-cafe mb-1">
            Arrastra una imagen aquí
          </p>
          <p className="text-xs text-warm">
            o haz clic para seleccionar · JPG, PNG, WebP (máx 2 MB)
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

      <p className="text-xs text-warm mt-2">
        💡 Esta imagen reemplaza al placeholder automático del producto.
      </p>
    </div>
  );
}

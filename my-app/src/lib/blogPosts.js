/**
 * Blog Posts Data
 * 
 * Estructura de datos para los posts del blog
 * Cada post puede tener contenido en múltiples idiomas
 */

const blogPosts = [
  {
    id: '1',
    slug: 'introduccion-bim-autodesk',
    title: {
      es: 'Introducción a BIM y Autodesk APIs',
      en: 'Introduction to BIM and Autodesk APIs'
    },
    excerpt: {
      es: 'Una introducción completa a las metodologías BIM y cómo las APIs de Autodesk pueden ayudar a automatizar procesos en proyectos de construcción.',
      en: 'A complete introduction to BIM methodologies and how Autodesk APIs can help automate processes in construction projects.'
    },
    content: {
      es: `
        <h2>¿Qué es BIM?</h2>
        <p>Building Information Modeling (BIM) es una metodología de trabajo colaborativa para la creación y gestión de proyectos de construcción. A diferencia del CAD tradicional, BIM no solo crea representaciones visuales, sino que construye modelos inteligentes que contienen información completa sobre cada elemento del edificio.</p>
        
        <p>En BIM, cada objeto (una pared, una ventana, un sistema HVAC) no es solo una forma geométrica, sino un elemento con propiedades, relaciones y datos que pueden ser utilizados a lo largo de todo el ciclo de vida del proyecto, desde el diseño inicial hasta la demolición.</p>
        
        <h3>Ventajas del BIM</h3>
        <ul>
          <li><strong>Mejora la colaboración:</strong> Múltiples disciplinas pueden trabajar simultáneamente en el mismo modelo, reduciendo conflictos y mejorando la comunicación.</li>
          <li><strong>Reduce errores y conflictos:</strong> La detección temprana de conflictos entre sistemas (estructura vs. MEP) ahorra tiempo y dinero.</li>
          <li><strong>Optimiza tiempo y costos:</strong> La visualización 3D y la generación automática de documentación aceleran los procesos de diseño.</li>
          <li><strong>Facilita la gestión del ciclo de vida:</strong> El modelo BIM puede ser utilizado para mantenimiento, operación y futuras renovaciones.</li>
          <li><strong>Análisis y simulación:</strong> Permite realizar análisis energéticos, estructurales y de iluminación desde etapas tempranas del diseño.</li>
        </ul>
        
        <h3>Niveles de Madurez BIM</h3>
        <p>El BIM se clasifica en diferentes niveles de madurez según la capacidad de colaboración y el intercambio de información:</p>
        <ul>
          <li><strong>Nivel 0:</strong> CAD 2D tradicional, sin colaboración.</li>
          <li><strong>Nivel 1:</strong> Modelos 3D, pero sin colaboración estructurada.</li>
          <li><strong>Nivel 2:</strong> Modelos 3D colaborativos con formatos comunes (IFC, COBie).</li>
          <li><strong>Nivel 3:</strong> Modelo único compartido en tiempo real (BIM integrado).</li>
        </ul>
        
        <h3>APIs de Autodesk: Extendiendo las Capacidades de BIM</h3>
        <p>Las APIs de Autodesk permiten automatizar tareas repetitivas y crear herramientas personalizadas para mejorar los flujos de trabajo BIM. Estas APIs proporcionan acceso programático a los datos y funcionalidades de las aplicaciones de Autodesk, permitiendo:</p>
        
        <ul>
          <li><strong>Automatización de procesos:</strong> Reducir tareas manuales repetitivas como la creación de planos, etiquetado de elementos, o generación de reportes.</li>
          <li><strong>Integración con otros sistemas:</strong> Conectar modelos BIM con sistemas ERP, bases de datos, o plataformas de gestión de proyectos.</li>
          <li><strong>Validación y control de calidad:</strong> Crear herramientas que verifiquen automáticamente el cumplimiento de estándares y normativas.</li>
          <li><strong>Análisis personalizado:</strong> Desarrollar herramientas de análisis específicas para necesidades del proyecto.</li>
          <li><strong>Personalización de la interfaz:</strong> Crear complementos que mejoren la experiencia del usuario.</li>
        </ul>
        
        <h3>Principales APIs de Autodesk</h3>
        <ul>
          <li><strong>Revit API:</strong> Para automatizar tareas dentro de Autodesk Revit, el software BIM más utilizado para arquitectura e ingeniería.</li>
          <li><strong>Autodesk Platform Services (APS/Forge):</strong> APIs en la nube para crear aplicaciones web que interactúan con modelos BIM sin necesidad de tener el software instalado.</li>
          <li><strong>AutoCAD API:</strong> Para automatizar tareas en AutoCAD y productos derivados.</li>
          <li><strong>Civil 3D API:</strong> Específica para proyectos de infraestructura y diseño civil.</li>
        </ul>
        
        <h3>Casos de Uso Reales</h3>
        <p>Algunos ejemplos prácticos de cómo las APIs de Autodesk pueden mejorar los flujos de trabajo:</p>
        <ul>
          <li><strong>Generación automática de planos:</strong> Crear vistas, secciones y detalles automáticamente basados en reglas predefinidas.</li>
          <li><strong>Validación de modelos:</strong> Verificar que todos los elementos cumplan con estándares de nomenclatura, propiedades requeridas, o relaciones correctas.</li>
          <li><strong>Exportación a formatos personalizados:</strong> Generar reportes, listas de materiales, o archivos para sistemas externos en formatos específicos.</li>
          <li><strong>Automatización de anotaciones:</strong> Etiquetar elementos automáticamente según su tipo y propiedades.</li>
          <li><strong>Dashboards web:</strong> Crear visualizadores web interactivos para que stakeholders puedan explorar modelos BIM sin necesidad de software especializado.</li>
        </ul>
        
        <h3>Conclusión</h3>
        <p>BIM representa el futuro de la industria de la construcción, y las APIs de Autodesk son la clave para maximizar su potencial. Al aprender a utilizar estas herramientas, los profesionales pueden no solo mejorar su productividad, sino también crear soluciones innovadoras que transformen la forma en que se diseñan y construyen los edificios.</p>
        
        <p>En los siguientes artículos, exploraremos en detalle cómo utilizar estas APIs para crear herramientas prácticas que resuelvan problemas reales en proyectos BIM.</p>
      `,
      en: `
        <h2>What is BIM?</h2>
        <p>Building Information Modeling (BIM) is a collaborative work methodology for the creation and management of construction projects. Unlike traditional CAD, BIM doesn't just create visual representations, but builds intelligent models that contain complete information about every element of the building.</p>
        
        <p>In BIM, each object (a wall, a window, an HVAC system) is not just a geometric shape, but an element with properties, relationships, and data that can be used throughout the entire project lifecycle, from initial design to demolition.</p>
        
        <h3>BIM Advantages</h3>
        <ul>
          <li><strong>Improves collaboration:</strong> Multiple disciplines can work simultaneously on the same model, reducing conflicts and improving communication.</li>
          <li><strong>Reduces errors and conflicts:</strong> Early detection of conflicts between systems (structure vs. MEP) saves time and money.</li>
          <li><strong>Optimizes time and costs:</strong> 3D visualization and automatic documentation generation accelerate design processes.</li>
          <li><strong>Facilitates lifecycle management:</strong> The BIM model can be used for maintenance, operation, and future renovations.</li>
          <li><strong>Analysis and simulation:</strong> Allows performing energy, structural, and lighting analyses from early design stages.</li>
        </ul>
        
        <h3>BIM Maturity Levels</h3>
        <p>BIM is classified into different maturity levels based on collaboration capability and information exchange:</p>
        <ul>
          <li><strong>Level 0:</strong> Traditional 2D CAD, no collaboration.</li>
          <li><strong>Level 1:</strong> 3D models, but without structured collaboration.</li>
          <li><strong>Level 2:</strong> Collaborative 3D models with common formats (IFC, COBie).</li>
          <li><strong>Level 3:</strong> Single shared model in real-time (integrated BIM).</li>
        </ul>
        
        <h3>Autodesk APIs: Extending BIM Capabilities</h3>
        <p>Autodesk APIs allow automating repetitive tasks and creating custom tools to improve BIM workflows. These APIs provide programmatic access to data and functionalities of Autodesk applications, enabling:</p>
        
        <ul>
          <li><strong>Process automation:</strong> Reduce repetitive manual tasks like creating drawings, element tagging, or report generation.</li>
          <li><strong>Integration with other systems:</strong> Connect BIM models with ERP systems, databases, or project management platforms.</li>
          <li><strong>Validation and quality control:</strong> Create tools that automatically verify compliance with standards and regulations.</li>
          <li><strong>Custom analysis:</strong> Develop specific analysis tools for project needs.</li>
          <li><strong>Interface customization:</strong> Create add-ins that improve user experience.</li>
        </ul>
        
        <h3>Main Autodesk APIs</h3>
        <ul>
          <li><strong>Revit API:</strong> To automate tasks within Autodesk Revit, the most used BIM software for architecture and engineering.</li>
          <li><strong>Autodesk Platform Services (APS/Forge):</strong> Cloud APIs to create web applications that interact with BIM models without needing the software installed.</li>
          <li><strong>AutoCAD API:</strong> To automate tasks in AutoCAD and derived products.</li>
          <li><strong>Civil 3D API:</strong> Specific for infrastructure projects and civil design.</li>
        </ul>
        
        <h3>Real Use Cases</h3>
        <p>Some practical examples of how Autodesk APIs can improve workflows:</p>
        <ul>
          <li><strong>Automatic drawing generation:</strong> Create views, sections, and details automatically based on predefined rules.</li>
          <li><strong>Model validation:</strong> Verify that all elements comply with naming standards, required properties, or correct relationships.</li>
          <li><strong>Export to custom formats:</strong> Generate reports, material lists, or files for external systems in specific formats.</li>
          <li><strong>Annotation automation:</strong> Automatically tag elements according to their type and properties.</li>
          <li><strong>Web dashboards:</strong> Create interactive web viewers so stakeholders can explore BIM models without specialized software.</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>BIM represents the future of the construction industry, and Autodesk APIs are the key to maximizing its potential. By learning to use these tools, professionals can not only improve their productivity but also create innovative solutions that transform how buildings are designed and constructed.</p>
        
        <p>In the following articles, we'll explore in detail how to use these APIs to create practical tools that solve real problems in BIM projects.</p>
      `
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-15',
    tags: ['BIM', 'Autodesk', 'APIs'],
    category: {
      es: 'Tutoriales',
      en: 'Tutorials'
    },
    image: '/images/sketch-draw.png',
    readingTime: {
      es: '12 min',
      en: '12 min'
    }
  },
  {
    id: '2',
    slug: 'automatizacion-revit-api',
    title: {
      es: 'Automatización con Revit API',
      en: 'Automation with Revit API'
    },
    excerpt: {
      es: 'Aprende cómo usar la Revit API para automatizar tareas comunes en proyectos BIM y mejorar la productividad.',
      en: 'Learn how to use the Revit API to automate common tasks in BIM projects and improve productivity.'
    },
    content: {
      es: `
        <h2>Introducción a Revit API</h2>
        <p>La Revit API permite crear complementos y scripts que extienden las capacidades de Autodesk Revit, el software BIM más utilizado en la industria de la construcción. Con la Revit API, puedes automatizar tareas repetitivas, crear herramientas personalizadas y mejorar significativamente la productividad en proyectos BIM.</p>
        
        <h3>¿Qué es la Revit API?</h3>
        <p>La Revit API es un conjunto de interfaces y clases .NET que proporcionan acceso programático a los datos y funcionalidades de Autodesk Revit. Está basada en .NET Framework y permite desarrollar complementos usando C# o VB.NET.</p>
        
        <p>Los complementos de Revit pueden ser de dos tipos principales:</p>
        <ul>
          <li><strong>External Commands:</strong> Comandos que se ejecutan manualmente desde la interfaz de Revit.</li>
          <li><strong>External Applications:</strong> Aplicaciones que se cargan automáticamente al iniciar Revit y pueden agregar menús, paneles o eventos.</li>
        </ul>
        
        <h3>Requisitos Previos</h3>
        <p>Para comenzar a desarrollar con Revit API necesitas:</p>
        <ul>
          <li><strong>Visual Studio:</strong> Visual Studio 2019 o superior (Community Edition es suficiente).</li>
          <li><strong>Revit SDK:</strong> El Software Development Kit de Revit, disponible en el Autodesk Developer Network.</li>
          <li><strong>Autodesk Revit:</strong> Una versión instalada de Revit (preferiblemente la versión más reciente).</li>
          <li><strong>Conocimientos básicos de C#:</strong> Aunque no necesitas ser un experto, es importante entender los conceptos básicos de programación orientada a objetos.</li>
        </ul>
        
        <h3>Estructura de un Complemento Básico</h3>
        <p>Un complemento de Revit típico sigue esta estructura:</p>
        <pre><code>using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

[Transaction(TransactionMode.Manual)]
public class MyFirstCommand : IExternalCommand
{
    public Result Execute(
        ExternalCommandData commandData,
        ref string message,
        ElementSet elements)
    {
        UIApplication uiapp = commandData.Application;
        UIDocument uidoc = uiapp.ActiveUIDocument;
        Document doc = uidoc.Document;
        
        // Tu código aquí
        
        return Result.Succeeded;
    }
}</code></pre>
        
        <h3>Conceptos Fundamentales</h3>
        
        <h4>Document y Element</h4>
        <p>En Revit API, el <code>Document</code> representa el modelo BIM actual. Todos los elementos del modelo (paredes, ventanas, niveles, etc.) son instancias de la clase <code>Element</code> o sus derivadas.</p>
        
        <h4>Transactions</h4>
        <p>Todas las modificaciones al modelo deben realizarse dentro de una transacción. Esto asegura la integridad de los datos y permite deshacer cambios.</p>
        <pre><code>using (Transaction trans = new Transaction(doc, "Modificar elementos"))
{
    trans.Start();
    // Modificar elementos aquí
    trans.Commit();
}</code></pre>
        
        <h4>Filtros</h4>
        <p>Los filtros permiten seleccionar elementos específicos del modelo. Revit API proporciona varios tipos de filtros:</p>
        <ul>
          <li><strong>FilteredElementCollector:</strong> Para obtener elementos por tipo o categoría.</li>
          <li><strong>ElementClassFilter:</strong> Para filtrar por clase de elemento.</li>
          <li><strong>ElementCategoryFilter:</strong> Para filtrar por categoría.</li>
        </ul>
        
        <h3>Casos de Uso Comunes</h3>
        
        <h4>1. Generación Automática de Planos</h4>
        <p>Crear vistas, secciones y detalles automáticamente basados en reglas predefinidas. Esto es especialmente útil en proyectos grandes donde se necesitan múltiples vistas similares.</p>
        
        <h4>2. Validación de Modelos BIM</h4>
        <p>Verificar que el modelo cumpla con estándares específicos: nomenclatura correcta, propiedades requeridas, relaciones válidas entre elementos, etc.</p>
        
        <h4>3. Exportación de Datos</h4>
        <p>Extraer información del modelo y exportarla a formatos personalizados (Excel, CSV, JSON) para análisis o integración con otros sistemas.</p>
        
        <h4>4. Automatización de Anotaciones</h4>
        <p>Etiquetar elementos automáticamente según su tipo, propiedades o ubicación. Esto puede ahorrar horas de trabajo manual.</p>
        
        <h4>5. Modificación Masiva de Elementos</h4>
        <p>Realizar cambios en múltiples elementos simultáneamente, como actualizar parámetros compartidos o cambiar propiedades de tipo.</p>
        
        <h3>Ejemplo Práctico: Contar Elementos por Categoría</h3>
        <p>Aquí tienes un ejemplo simple que cuenta elementos por categoría:</p>
        <pre><code>using (Transaction trans = new Transaction(doc, "Contar elementos"))
{
    trans.Start();
    
    FilteredElementCollector collector = 
        new FilteredElementCollector(doc);
    
    var walls = collector
        .OfClass(typeof(Wall))
        .ToElements();
    
    var windows = collector
        .OfClass(typeof(FamilyInstance))
        .OfCategory(BuiltInCategory.OST_Windows)
        .ToElements();
    
    TaskDialog.Show("Resultados", 
        $"Paredes: {walls.Count()}\\n" +
        $"Ventanas: {windows.Count()}");
    
    trans.Commit();
}</code></pre>
        
        <h3>Mejores Prácticas</h3>
        <ul>
          <li><strong>Manejo de errores:</strong> Siempre incluye manejo de excepciones para evitar que Revit se cierre inesperadamente.</li>
          <li><strong>Optimización:</strong> Usa filtros eficientes y evita iterar sobre todos los elementos cuando solo necesitas un subconjunto.</li>
          <li><strong>Transacciones:</strong> Agrupa operaciones relacionadas en una sola transacción cuando sea posible.</li>
          <li><strong>Interfaz de usuario:</strong> Proporciona feedback al usuario durante operaciones largas usando ProgressBar o TaskDialog.</li>
          <li><strong>Documentación:</strong> Documenta tu código, especialmente si otros desarrolladores trabajarán con él.</li>
        </ul>
        
        <h3>Recursos de Aprendizaje</h3>
        <ul>
          <li><strong>Revit API Documentation:</strong> La documentación oficial de Autodesk es el recurso más completo.</li>
          <li><strong>Revit API Forum:</strong> La comunidad de desarrolladores es muy activa y útil para resolver problemas.</li>
          <li><strong>Ejemplos del SDK:</strong> El SDK incluye muchos ejemplos que demuestran diferentes funcionalidades.</li>
          <li><strong>GitHub:</strong> Hay muchos proyectos open source que puedes estudiar.</li>
        </ul>
        
        <h3>Conclusión</h3>
        <p>La Revit API es una herramienta poderosa que puede transformar tu flujo de trabajo en Revit. Aunque hay una curva de aprendizaje inicial, los beneficios en términos de productividad y capacidad de personalización hacen que valga la pena el esfuerzo.</p>
        
        <p>En futuros artículos, exploraremos ejemplos más avanzados y casos de uso específicos que puedes implementar en tus propios proyectos.</p>
      `,
      en: `
        <h2>Introduction to Revit API</h2>
        <p>The Revit API allows creating add-ins and scripts that extend Autodesk Revit capabilities, the most used BIM software in the construction industry. With the Revit API, you can automate repetitive tasks, create custom tools, and significantly improve productivity in BIM projects.</p>
        
        <h3>What is the Revit API?</h3>
        <p>The Revit API is a set of .NET interfaces and classes that provide programmatic access to Autodesk Revit data and functionalities. It's based on .NET Framework and allows developing add-ins using C# or VB.NET.</p>
        
        <p>Revit add-ins can be of two main types:</p>
        <ul>
          <li><strong>External Commands:</strong> Commands that are executed manually from the Revit interface.</li>
          <li><strong>External Applications:</strong> Applications that load automatically when Revit starts and can add menus, panels, or events.</li>
        </ul>
        
        <h3>Prerequisites</h3>
        <p>To start developing with Revit API you need:</p>
        <ul>
          <li><strong>Visual Studio:</strong> Visual Studio 2019 or higher (Community Edition is sufficient).</li>
          <li><strong>Revit SDK:</strong> The Revit Software Development Kit, available on the Autodesk Developer Network.</li>
          <li><strong>Autodesk Revit:</strong> An installed version of Revit (preferably the latest version).</li>
          <li><strong>Basic C# knowledge:</strong> While you don't need to be an expert, it's important to understand basic object-oriented programming concepts.</li>
        </ul>
        
        <h3>Basic Add-in Structure</h3>
        <p>A typical Revit add-in follows this structure:</p>
        <pre><code>using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

[Transaction(TransactionMode.Manual)]
public class MyFirstCommand : IExternalCommand
{
    public Result Execute(
        ExternalCommandData commandData,
        ref string message,
        ElementSet elements)
    {
        UIApplication uiapp = commandData.Application;
        UIDocument uidoc = uiapp.ActiveUIDocument;
        Document doc = uidoc.Document;
        
        // Your code here
        
        return Result.Succeeded;
    }
}</code></pre>
        
        <h3>Fundamental Concepts</h3>
        
        <h4>Document and Element</h4>
        <p>In Revit API, <code>Document</code> represents the current BIM model. All model elements (walls, windows, levels, etc.) are instances of the <code>Element</code> class or its derivatives.</p>
        
        <h4>Transactions</h4>
        <p>All model modifications must be made within a transaction. This ensures data integrity and allows undoing changes.</p>
        <pre><code>using (Transaction trans = new Transaction(doc, "Modify elements"))
{
    trans.Start();
    // Modify elements here
    trans.Commit();
}</code></pre>
        
        <h4>Filters</h4>
        <p>Filters allow selecting specific elements from the model. Revit API provides several types of filters:</p>
        <ul>
          <li><strong>FilteredElementCollector:</strong> To get elements by type or category.</li>
          <li><strong>ElementClassFilter:</strong> To filter by element class.</li>
          <li><strong>ElementCategoryFilter:</strong> To filter by category.</li>
        </ul>
        
        <h3>Common Use Cases</h3>
        
        <h4>1. Automatic Drawing Generation</h4>
        <p>Create views, sections, and details automatically based on predefined rules. This is especially useful in large projects where multiple similar views are needed.</p>
        
        <h4>2. BIM Model Validation</h4>
        <p>Verify that the model complies with specific standards: correct nomenclature, required properties, valid relationships between elements, etc.</li>
        
        <h4>3. Data Export</h4>
        <p>Extract information from the model and export it to custom formats (Excel, CSV, JSON) for analysis or integration with other systems.</p>
        
        <h4>4. Annotation Automation</h4>
        <p>Automatically tag elements according to their type, properties, or location. This can save hours of manual work.</p>
        
        <h4>5. Mass Element Modification</h4>
        <p>Make changes to multiple elements simultaneously, such as updating shared parameters or changing type properties.</p>
        
        <h3>Practical Example: Count Elements by Category</h3>
        <p>Here's a simple example that counts elements by category:</p>
        <pre><code>using (Transaction trans = new Transaction(doc, "Count elements"))
{
    trans.Start();
    
    FilteredElementCollector collector = 
        new FilteredElementCollector(doc);
    
    var walls = collector
        .OfClass(typeof(Wall))
        .ToElements();
    
    var windows = collector
        .OfClass(typeof(FamilyInstance))
        .OfCategory(BuiltInCategory.OST_Windows)
        .ToElements();
    
    TaskDialog.Show("Results", 
        $"Walls: {walls.Count()}\\n" +
        $"Windows: {windows.Count()}");
    
    trans.Commit();
}</code></pre>
        
        <h3>Best Practices</h3>
        <ul>
          <li><strong>Error handling:</strong> Always include exception handling to prevent Revit from closing unexpectedly.</li>
          <li><strong>Optimization:</strong> Use efficient filters and avoid iterating over all elements when you only need a subset.</li>
          <li><strong>Transactions:</strong> Group related operations in a single transaction when possible.</li>
          <li><strong>User interface:</strong> Provide feedback to users during long operations using ProgressBar or TaskDialog.</li>
          <li><strong>Documentation:</strong> Document your code, especially if other developers will work with it.</li>
        </ul>
        
        <h3>Learning Resources</h3>
        <ul>
          <li><strong>Revit API Documentation:</strong> Autodesk's official documentation is the most comprehensive resource.</li>
          <li><strong>Revit API Forum:</strong> The developer community is very active and helpful for solving problems.</li>
          <li><strong>SDK Examples:</strong> The SDK includes many examples demonstrating different functionalities.</li>
          <li><strong>GitHub:</strong> There are many open source projects you can study.</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>The Revit API is a powerful tool that can transform your workflow in Revit. Although there's an initial learning curve, the benefits in terms of productivity and customization capability make it worth the effort.</p>
        
        <p>In future articles, we'll explore more advanced examples and specific use cases that you can implement in your own projects.</p>
      `
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-10',
    tags: ['Revit', 'API', 'Automatización'],
    category: {
      es: 'Tutoriales',
      en: 'Tutorials'
    },
    image: '/images/sketch-draw-white.webp',
    readingTime: {
      es: '15 min',
      en: '15 min'
    }
  },
  {
    id: '3',
    slug: 'forge-platform-services',
    title: {
      es: 'Autodesk Platform Services (Forge)',
      en: 'Autodesk Platform Services (Forge)'
    },
    excerpt: {
      es: 'Explorando las capacidades de Autodesk Platform Services para crear aplicaciones web que interactúan con modelos BIM.',
      en: 'Exploring Autodesk Platform Services capabilities to create web applications that interact with BIM models.'
    },
    content: {
      es: `
        <h2>¿Qué es Autodesk Platform Services?</h2>
        <p>Autodesk Platform Services (APS), anteriormente conocido como Forge, es una plataforma en la nube que proporciona un conjunto completo de APIs y servicios para trabajar con datos de diseño y modelos BIM. A diferencia de las APIs de escritorio como Revit API, APS permite crear aplicaciones web que interactúan con modelos BIM sin necesidad de tener el software de Autodesk instalado localmente.</p>
        
        <h3>¿Por qué APS es Importante?</h3>
        <p>En la era de la colaboración en la nube y el acceso remoto, APS permite llevar los modelos BIM a la web, facilitando el acceso para stakeholders que no tienen acceso a software especializado. Esto abre nuevas posibilidades para:</p>
        <ul>
          <li><strong>Visualización web:</strong> Ver modelos BIM en cualquier navegador sin plugins.</li>
          <li><strong>Colaboración:</strong> Múltiples usuarios pueden revisar y comentar modelos simultáneamente.</li>
          <li><strong>Integración:</strong> Conectar modelos BIM con sistemas web existentes.</li>
          <li><strong>Automatización en la nube:</strong> Procesar modelos sin necesidad de recursos locales.</li>
        </ul>
        
        <h3>Servicios Principales de APS</h3>
        
        <h4>1. Model Derivative API</h4>
        <p>Este servicio permite convertir modelos de diseño (Revit, AutoCAD, Inventor, etc.) a formatos optimizados para visualización web. Es el corazón de cualquier aplicación de visualización basada en APS.</p>
        <ul>
          <li><strong>Conversión de formatos:</strong> Convierte archivos nativos de Autodesk a SVF (Simple Viewing Format) para visualización web.</li>
          <li><strong>Extracción de geometría:</strong> Obtiene información geométrica y propiedades de los modelos.</li>
          <li><strong>Generación de thumbnails:</strong> Crea imágenes de vista previa de los modelos.</li>
          <li><strong>Extracción de propiedades:</strong> Extrae datos y metadatos de los elementos del modelo.</li>
        </ul>
        
        <h4>2. Data Management API</h4>
        <p>Gestiona archivos, proyectos y relaciones entre datos en Autodesk Construction Cloud (ACC) y Autodesk Docs.</p>
        <ul>
          <li><strong>Gestión de proyectos:</strong> Crear, leer, actualizar y eliminar proyectos.</li>
          <li><strong>Gestión de archivos:</strong> Subir, descargar y organizar archivos.</li>
          <li><strong>Versiones:</strong> Gestionar versiones de archivos y modelos.</li>
          <li><strong>Relaciones:</strong> Establecer relaciones entre archivos y proyectos.</li>
        </ul>
        
        <h4>3. Design Automation API</h4>
        <p>Permite automatizar tareas de diseño ejecutando scripts o complementos en la nube. Es especialmente útil para procesamiento por lotes.</p>
        <ul>
          <li><strong>WorkItems:</strong> Ejecutar tareas de diseño automatizadas.</li>
          <li><strong>AppBundles:</strong> Empaquetar scripts y complementos para ejecución en la nube.</li>
          <li><strong>Procesamiento por lotes:</strong> Procesar múltiples archivos automáticamente.</li>
        </ul>
        
        <h4>4. Webhooks</h4>
        <p>Sistema de notificaciones que permite a tu aplicación recibir eventos cuando ocurren cambios en los datos de Autodesk.</p>
        <ul>
          <li><strong>Eventos de archivo:</strong> Notificaciones cuando se suben, modifican o eliminan archivos.</li>
          <li><strong>Eventos de conversión:</strong> Notificaciones cuando completan las conversiones de modelos.</li>
          <li><strong>Eventos personalizados:</strong> Crear webhooks para eventos específicos de tu aplicación.</li>
        </ul>
        
        <h4>5. Authentication (OAuth 2.0)</h4>
        <p>Sistema de autenticación seguro que permite a los usuarios autorizar a tu aplicación para acceder a sus datos de Autodesk.</p>
        
        <h3>Flujo de Trabajo Típico</h3>
        <p>Un flujo de trabajo común con APS sigue estos pasos:</p>
        <ol>
          <li><strong>Autenticación:</strong> El usuario se autentica usando OAuth 2.0.</li>
          <li><strong>Subida de archivo:</strong> Se sube un archivo (por ejemplo, un modelo Revit) usando Data Management API.</li>
          <li><strong>Conversión:</strong> Se solicita la conversión del archivo a formato SVF usando Model Derivative API.</li>
          <li><strong>Visualización:</strong> Una vez completada la conversión, se visualiza el modelo usando el Viewer de APS.</li>
          <li><strong>Interacción:</strong> Los usuarios pueden interactuar con el modelo, seleccionar elementos, ver propiedades, etc.</li>
        </ol>
        
        <h3>Ejemplo de Integración: Visualizador Web Básico</h3>
        <p>Aquí tienes un ejemplo básico de cómo integrar el Viewer de APS en una aplicación web:</p>
        <pre><code>&lt;script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"&gt;&lt;/script&gt;

&lt;div id="viewer"&gt;&lt;/div&gt;

&lt;script&gt;
  const options = {
    env: 'AutodeskProduction',
    getAccessToken: async (onTokenReady) => {
      // Obtener token de acceso
      const response = await fetch('/api/aps/token');
      const data = await response.json();
      onTokenReady(data.access_token, data.expires_in);
    }
  };

  Autodesk.Viewing.Initializer(options, () => {
    const viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById('viewer')
    );
    viewer.start();
    
    // Cargar modelo
    const documentId = 'urn:YOUR_MODEL_URN';
    Autodesk.Viewing.Document.load(documentId, (doc) => {
      const viewables = doc.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(doc, viewables);
    });
  });
&lt;/script&gt;</code></pre>
        
        <h3>Casos de Uso Reales</h3>
        
        <h4>1. Dashboards de Proyecto</h4>
        <p>Crear dashboards web que muestren información agregada de múltiples modelos BIM, permitiendo a los gerentes de proyecto ver el estado general sin abrir Revit.</p>
        
        <h4>2. Visualizadores para Clientes</h4>
        <p>Permitir que los clientes exploren modelos BIM en sus navegadores, facilitando la comunicación y aprobación de diseños.</p>
        
        <h4>3. Herramientas de Colaboración</h4>
        <p>Crear aplicaciones que permitan a múltiples usuarios revisar modelos simultáneamente, agregar comentarios y marcar problemas.</p>
        
        <h4>4. Integración con Sistemas Externos</h4>
        <p>Conectar modelos BIM con sistemas ERP, plataformas de gestión de proyectos, o bases de datos para análisis avanzados.</p>
        
        <h4>5. Aplicaciones Móviles</h4>
        <p>Desarrollar aplicaciones móviles que permitan visualizar y revisar modelos BIM en tablets y smartphones.</p>
        
        <h3>Ventajas de APS</h3>
        <ul>
          <li><strong>Sin instalación:</strong> Los usuarios no necesitan software especializado instalado.</li>
          <li><strong>Escalabilidad:</strong> La nube maneja el procesamiento pesado.</li>
          <li><strong>Acceso multiplataforma:</strong> Funciona en cualquier dispositivo con navegador.</li>
          <li><strong>Actualizaciones automáticas:</strong> Siempre tienes acceso a las últimas versiones de los servicios.</li>
          <li><strong>Integración fácil:</strong> APIs RESTful estándar facilitan la integración.</li>
        </ul>
        
        <h3>Consideraciones Importantes</h3>
        <ul>
          <li><strong>Costos:</strong> APS tiene un modelo de precios basado en uso. Es importante entender los costos antes de escalar.</li>
          <li><strong>Límites de tasa:</strong> Las APIs tienen límites de tasa que debes considerar en tu diseño.</li>
          <li><strong>Seguridad:</strong> Implementa autenticación y autorización adecuadas para proteger los datos.</li>
          <li><strong>Rendimiento:</strong> Las conversiones de modelos grandes pueden tomar tiempo. Considera implementar colas de procesamiento.</li>
        </ul>
        
        <h3>Recursos para Empezar</h3>
        <ul>
          <li><strong>APS Developer Portal:</strong> Documentación oficial y guías de inicio rápido.</li>
          <li><strong>APS Samples:</strong> Ejemplos de código en GitHub para diferentes lenguajes.</li>
          <li><strong>Foro de la Comunidad:</strong> Comunidad activa de desarrolladores dispuestos a ayudar.</li>
          <li><strong>Tutoriales:</strong> Autodesk University y otros recursos educativos.</li>
        </ul>
        
        <h3>Conclusión</h3>
        <p>Autodesk Platform Services representa el futuro de la colaboración BIM en la nube. Al aprender a utilizar estas APIs, puedes crear aplicaciones innovadoras que transformen cómo los equipos trabajan con modelos BIM, facilitando el acceso, la colaboración y la integración con otros sistemas.</p>
        
        <p>Si estás interesado en desarrollar aplicaciones web que trabajen con modelos BIM, APS es la plataforma ideal para comenzar. En futuros artículos, exploraremos ejemplos más detallados y casos de uso específicos.</p>
      `,
      en: `
        <h2>What is Autodesk Platform Services?</h2>
        <p>Autodesk Platform Services (APS), previously known as Forge, is a cloud platform that provides a comprehensive set of APIs and services to work with design data and BIM models. Unlike desktop APIs like Revit API, APS allows creating web applications that interact with BIM models without needing Autodesk software installed locally.</p>
        
        <h3>Why is APS Important?</h3>
        <p>In the era of cloud collaboration and remote access, APS allows bringing BIM models to the web, facilitating access for stakeholders who don't have access to specialized software. This opens new possibilities for:</p>
        <ul>
          <li><strong>Web visualization:</strong> View BIM models in any browser without plugins.</li>
          <li><strong>Collaboration:</strong> Multiple users can review and comment on models simultaneously.</li>
          <li><strong>Integration:</strong> Connect BIM models with existing web systems.</li>
          <li><strong>Cloud automation:</strong> Process models without needing local resources.</li>
        </ul>
        
        <h3>Main APS Services</h3>
        
        <h4>1. Model Derivative API</h4>
        <p>This service allows converting design models (Revit, AutoCAD, Inventor, etc.) to formats optimized for web visualization. It's the heart of any visualization application based on APS.</p>
        <ul>
          <li><strong>Format conversion:</strong> Converts native Autodesk files to SVF (Simple Viewing Format) for web visualization.</li>
          <li><strong>Geometry extraction:</strong> Gets geometric information and properties from models.</li>
          <li><strong>Thumbnail generation:</strong> Creates preview images of models.</li>
          <li><strong>Property extraction:</strong> Extracts data and metadata from model elements.</li>
        </ul>
        
        <h4>2. Data Management API</h4>
        <p>Manages files, projects, and relationships between data in Autodesk Construction Cloud (ACC) and Autodesk Docs.</p>
        <ul>
          <li><strong>Project management:</strong> Create, read, update, and delete projects.</li>
          <li><strong>File management:</strong> Upload, download, and organize files.</li>
          <li><strong>Versions:</strong> Manage file and model versions.</li>
          <li><strong>Relationships:</strong> Establish relationships between files and projects.</li>
        </ul>
        
        <h4>3. Design Automation API</h4>
        <p>Allows automating design tasks by executing scripts or add-ins in the cloud. Especially useful for batch processing.</p>
        <ul>
          <li><strong>WorkItems:</strong> Execute automated design tasks.</li>
          <li><strong>AppBundles:</strong> Package scripts and add-ins for cloud execution.</li>
          <li><strong>Batch processing:</strong> Process multiple files automatically.</li>
        </ul>
        
        <h4>4. Webhooks</h4>
        <p>Notification system that allows your application to receive events when changes occur in Autodesk data.</p>
        <ul>
          <li><strong>File events:</strong> Notifications when files are uploaded, modified, or deleted.</li>
          <li><strong>Conversion events:</strong> Notifications when model conversions complete.</li>
          <li><strong>Custom events:</strong> Create webhooks for specific application events.</li>
        </ul>
        
        <h4>5. Authentication (OAuth 2.0)</h4>
        <p>Secure authentication system that allows users to authorize your application to access their Autodesk data.</p>
        
        <h3>Typical Workflow</h3>
        <p>A common workflow with APS follows these steps:</p>
        <ol>
          <li><strong>Authentication:</strong> User authenticates using OAuth 2.0.</li>
          <li><strong>File upload:</strong> Upload a file (e.g., a Revit model) using Data Management API.</li>
          <li><strong>Conversion:</strong> Request file conversion to SVF format using Model Derivative API.</li>
          <li><strong>Visualization:</strong> Once conversion is complete, visualize the model using APS Viewer.</li>
          <li><strong>Interaction:</strong> Users can interact with the model, select elements, view properties, etc.</li>
        </ol>
        
        <h3>Integration Example: Basic Web Viewer</h3>
        <p>Here's a basic example of how to integrate APS Viewer in a web application:</p>
        <pre><code>&lt;script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"&gt;&lt;/script&gt;

&lt;div id="viewer"&gt;&lt;/div&gt;

&lt;script&gt;
  const options = {
    env: 'AutodeskProduction',
    getAccessToken: async (onTokenReady) => {
      // Get access token
      const response = await fetch('/api/aps/token');
      const data = await response.json();
      onTokenReady(data.access_token, data.expires_in);
    }
  };

  Autodesk.Viewing.Initializer(options, () => {
    const viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById('viewer')
    );
    viewer.start();
    
    // Load model
    const documentId = 'urn:YOUR_MODEL_URN';
    Autodesk.Viewing.Document.load(documentId, (doc) => {
      const viewables = doc.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(doc, viewables);
    });
  });
&lt;/script&gt;</code></pre>
        
        <h3>Real Use Cases</h3>
        
        <h4>1. Project Dashboards</h4>
        <p>Create web dashboards that show aggregated information from multiple BIM models, allowing project managers to see overall status without opening Revit.</p>
        
        <h4>2. Client Viewers</h4>
        <p>Allow clients to explore BIM models in their browsers, facilitating communication and design approval.</p>
        
        <h4>3. Collaboration Tools</h4>
        <p>Create applications that allow multiple users to review models simultaneously, add comments, and mark issues.</p>
        
        <h4>4. Integration with External Systems</h4>
        <p>Connect BIM models with ERP systems, project management platforms, or databases for advanced analysis.</p>
        
        <h4>5. Mobile Applications</h4>
        <p>Develop mobile applications that allow visualizing and reviewing BIM models on tablets and smartphones.</p>
        
        <h3>APS Advantages</h3>
        <ul>
          <li><strong>No installation:</strong> Users don't need specialized software installed.</li>
          <li><strong>Scalability:</strong> The cloud handles heavy processing.</li>
          <li><strong>Cross-platform access:</strong> Works on any device with a browser.</li>
          <li><strong>Automatic updates:</strong> You always have access to the latest service versions.</li>
          <li><strong>Easy integration:</strong> Standard RESTful APIs facilitate integration.</li>
        </ul>
        
        <h3>Important Considerations</h3>
        <ul>
          <li><strong>Costs:</strong> APS has a usage-based pricing model. It's important to understand costs before scaling.</li>
          <li><strong>Rate limits:</strong> APIs have rate limits you must consider in your design.</li>
          <li><strong>Security:</strong> Implement adequate authentication and authorization to protect data.</li>
          <li><strong>Performance:</strong> Conversions of large models can take time. Consider implementing processing queues.</li>
        </ul>
        
        <h3>Resources to Get Started</h3>
        <ul>
          <li><strong>APS Developer Portal:</strong> Official documentation and quick start guides.</li>
          <li><strong>APS Samples:</strong> Code examples on GitHub for different languages.</li>
          <li><strong>Community Forum:</strong> Active community of developers willing to help.</li>
          <li><strong>Tutorials:</strong> Autodesk University and other educational resources.</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>Autodesk Platform Services represents the future of cloud BIM collaboration. By learning to use these APIs, you can create innovative applications that transform how teams work with BIM models, facilitating access, collaboration, and integration with other systems.</p>
        
        <p>If you're interested in developing web applications that work with BIM models, APS is the ideal platform to start. In future articles, we'll explore more detailed examples and specific use cases.</p>
      `
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2025-01-05',
    updatedAt: '2025-01-05',
    tags: ['Forge', 'APS', 'Cloud'],
    category: {
      es: 'Tecnología',
      en: 'Technology'
    },
    image: '/images/sketch-draw.png',
    readingTime: {
      es: '14 min',
      en: '14 min'
    }
  }
];

/**
 * Obtiene todos los posts del blog
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Array} Array de posts formateados
 */
export function getAllBlogPosts(locale = 'es') {
  return blogPosts.map(post => ({
    ...post,
    title: post.title[locale] || post.title.es,
    excerpt: post.excerpt[locale] || post.excerpt.es,
    category: post.category[locale] || post.category.es,
    readingTime: post.readingTime[locale] || post.readingTime.es,
  })).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

/**
 * Obtiene un post por slug
 * @param {string} slug - Slug del post
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Object|null} Post o null si no existe
 */
export function getBlogPostBySlug(slug, locale = 'es') {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return null;

  return {
    ...post,
    title: post.title[locale] || post.title.es,
    excerpt: post.excerpt[locale] || post.excerpt.es,
    content: post.content[locale] || post.content.es,
    category: post.category[locale] || post.category.es,
    readingTime: post.readingTime[locale] || post.readingTime.es,
  };
}

/**
 * Obtiene posts por categoría
 * @param {string} category - Categoría del post
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Array} Array de posts filtrados
 */
export function getBlogPostsByCategory(category, locale = 'es') {
  return getAllBlogPosts(locale).filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Obtiene todas las categorías disponibles
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Array} Array de categorías únicas
 */
export function getAllCategories(locale = 'es') {
  const categories = blogPosts.map(post => 
    post.category[locale] || post.category.es
  );
  return [...new Set(categories)];
}

export default blogPosts;

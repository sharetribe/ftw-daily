import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Última actualización: Abril 20, 2020</p>

      <p>
        Este documento describe los términos y condiciones generales (los "Términos y Condiciones 
        Generales") aplicables al acceso y uso de los servicios ofrecidos por REMEAP E.I.R.L. ("los Servicios") 
        dentro del sitio web www.reactivate.pe, sus subdominios y/u otros dominios (urls) relacionados (en adelante el "Sitio"), 
        en donde éstos Términos y Condiciones se encuentren. Cualquier persona que desee acceder y/o suscribirse y/o usar el Sitio o 
        los Servicios podrá hacerlo sujetándose a los Términos y Condiciones Generales, junto con todas las demás políticas y principios 
        que rigen www.reactivate.pe y que son incorporados al presente directamente o por referencia o que son explicados y/o detallados 
        en otras secciones del Sitio. En consecuencia, todas las visitas, todos los contratos y transacciones que se realicen en este Sitio, 
        así como sus efectos jurídicos, quedarán regidos por estas reglas y sometidos a la legislación aplicable en Perú.
      </p>

      <p>
        Los Términos y Condiciones contenidos en este documento se aplicarán y se entenderán como parte integral de todos los actos y contratos 
        que se ejecuten o celebren mediante los sistemas de oferta y comercialización comprendidos en este sitio entre los usuarios de este sitio 
        y por cualquiera de las otras sociedades o empresas que sean filiales o vinculadas y que hagan uso de este sitio, a las cuales se las 
        denominará en adelante también en forma indistinta como las "Empresas", o bien la "Empresa Oferente", el "Merchant Partner" o la "Empresa Vendedora", 
        según convenga al sentido del texto.
      </p>

      <p>
        En caso que las Empresas hubieran fijado sus propios Términos y Condiciones y sus Políticas de Privacidad para los actos y contratos que realicen en este sitio, 
        ellas aparecerán en esta página señalada con un link o indicada como parte de la promoción de sus ofertas y promociones y prevalecerán sobre éstas. CUALQUIER PERSONA 
        QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES Y LAS POLÍTICAS DE PRIVACIDAD, LOS CUALES TIENEN UN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR 
        EL SITIO Y/O LOS SERVICIOS.
      </p>

      <p>
        El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los Términos y Condiciones Generales y en las Políticas de Privacidad de REMEAP E.I.R.L. así 
        como en los demás documentos incorporados a los mismos por referencia, previo a su registro como Usuario en www.reactivate.pe y/o a la adquisición de productos y/o entrega 
        de cualquier dato con cualquier fin.
      </p>

         <h2>1.    Capacidad legal</h2>
      <p> 
      Los Servicios sólo están disponibles para personas que tengan capacidad legal para contratar. No podrán utilizar los servicios las personas que no tengan esa capacidad entre 
      estos los menores de edad o Usuarios de www.reactivate.pe que hayan sido suspendidos temporalmente o inhabilitados definitivamente en razón de lo dispuesto en la sección 
      2 “Registro y Uso del Sitio”. Los actos que los menores realicen en este sitio serán responsabilidad de sus padres, tutores, encargados o curadores, y por tanto se considerarán 
      realizados por éstos en ejercicio de la representación legal con la que cuentan.
      </p>

      <p>
      Quien registre un Usuario como empresa afirmará que (i) cuenta con capacidad para contratar en representación de tal entidad y de obligar a la misma en los términos de este Acuerdo, 
      (ii) la dirección señalada en el registro es el domicilio principal de dicha entidad, y (iii) cualquier otra información presentada a Reactivate Perú será considerada verdadera, precisa, 
      actualizada y completa.
      </p>

      <h2>2.    Registro y Uso del Sitio</h2>

      <p>
      Es obligatorio completar el formulario de registro en todos sus campos con datos válidos para convertirse en Usuario autorizado de www.reactivate.pe. (El "Miembro Reactivate Perú" o 
      el "Usuario"), de esta manera, podrá acceder a las promociones, y a la adquisición de productos y/o servicios ofrecidos en este sitio. El futuro Miembro Reactivate Perú deberá completar 
      el formulario de registro con su información personal de manera exacta, precisa y verdadera ("Datos Personales") y asume el compromiso de actualizar los Datos Personales conforme resulte 
      necesario. Reactivate Perú podrá utilizar diversos medios para identificar a los Miembros del Sitio, pero NO se responsabiliza por la certeza de los Datos Personales provistos por sus Usuarios. 
      Los Usuarios garantizan y responden, en cualquier caso, de la exactitud, veracidad, vigencia y autenticidad de los Datos Personales ingresados. En ese sentido, la declaración realizada por los 
      Usuarios al momento de registrarse se entenderá como una Declaración Jurada.
      </p>

      <p>
      Cada miembro sólo podrá ser titular de 1 (una) cuenta el Sitio, no pudiendo acceder a más de 1 (una) cuenta con distintas direcciones de correo electrónico o falseando, modificando y/o 
      alterando sus datos personales de cualquier manera posible. En caso se detecte esta infracción, REMEAP E.I.R.L. a través de www.reactivate.pe comunicará al cliente informándole que todas 
      sus cuentas serán agrupadas en una sola cuenta anulándose todas sus demás.
      </p>

      <p>
      Si se verificará o sospechará algún uso fraudulento y/o malintencionado y/o contrario a estos Términos y Condiciones y/o contrarios a la buena fe, Reactivate Perú Perú tendrá el derecho 
      inapelable de dar por terminados los créditos, no hacer efectiva las promociones, cancelar las transacciones en curso, dar de baja las cuentas y hasta de perseguir judicialmente a los infractores.
      </p>

      <p>
      Reactivate Perú podrá realizar controles que crea convenientes para verificar la veracidad de la información dada por el Usuario. En ese sentido, se reserva el derecho de solicitar algún 
      comprobante y/o dato adicional a efectos de corroborar los Datos Personales, así como de suspender temporal o definitivamente a aquellos Usuarios cuyos datos no hayan podido ser confirmados. 
      En estos casos de inhabilitación, Reactivate Perú Perú podrá dar de baja la compra efectuada, sin que ello genere derecho alguno a resarcimiento, pago y/o indemnización.
      </p>

      <p>
      El Miembro Reactivate Perú, una vez registrado, dispondrá de su dirección de email y una clave secreta (en adelante la "Clave") que le permitirá el acceso personalizado, confidencial y seguro. 
      En caso de poseer estos datos, el Usuario tendrá la posibilidad de cambiar la Clave de acceso para lo cual deberá sujetarse al procedimiento establecido en el sitio respectivo. El Usuario se 
      obliga a mantener la confidencialidad de su Clave de acceso, asumiendo totalmente la responsabilidad por el mantenimiento de la confidencialidad de su Clave secreta registrada en este sitio web, 
      la cual le permite efectuar compras, solicitar servicios y obtener información (la “Cuenta”). Dicha Clave es de uso personal, y su entrega a terceros no involucra responsabilidad de Reactivate 
      Perú Perú o de las empresas en caso de utilización indebida, negligente y/o incorrecta.
      </p>

      <p>
      El Usuario será responsable por todas las operaciones efectuadas en y desde su Cuenta, pues el acceso a la misma está restringido al ingreso y uso de una Clave secreta, de conocimiento exclusivo del 
      Usuario. El Miembro Reactivate Perú se compromete a notificar a Reactivate Perú Perú en forma inmediata y por medio idóneo y fehaciente, cualquier uso no autorizado de su Cuenta y/o Clave, así como 
      el ingreso por terceros no autorizados a la misma. Se aclara que está prohibida la venta, cesión, préstamo o transferencia de la Clave y/o Cuenta bajo ningún título.
      </p>

      <h2>3.    Modificaciones del acuerdo</h2>

      <p>
      REMEAP E.I.R.L. y las Empresas vendedoras podrán modificar los Términos y Condiciones Generales en cualquier momento, haciendo públicos en el Sitio los términos modificados. Todos los términos 
      modificados entrarán en vigor a los 07 (siete) días hábiles después de su publicación. Dentro de los 05 (cinco) días hábiles siguientes a la publicación de las modificaciones introducidas, 
      el Usuario se deberá comunicar por e-mail a la siguiente dirección: hola@Reactivate Perú.com si no acepta las mismas; en ese caso quedará disuelto el vínculo contractual y será inhabilitado como 
      Miembro durante las próximas 48 horas hábiles. Vencido este plazo, se considerará que el Usuario acepta los nuevos términos y el contrato continuará vinculando a ambas partes.
      </p>

      <h2>4.    Procedimiento para hacer uso de este sitio de internet</h2>

      <p>
      En los contratos ofrecidos por medio del Sitio, La Empresa informará, de manera inequívoca y fácilmente accesible, los pasos que deberán seguirse para celebrarlos, e informará, cuando corresponda, 
      si el documento electrónico en que se formalice el contrato será archivado y si éste será accesible al Miembro. El sólo hecho de seguir los pasos que para tales efectos se indiquen en este sitio para 
      efectuar una compra, equivale a aceptar que efectivamente ha dado cumplimiento a las condiciones contenidas en este apartado. Indicará, además, su dirección de correo postal o electrónico y los medios 
      técnicos a disposición del Miembro para identificar y corregir errores en el envío o en sus datos.
      </p>

      <h2>5.    Medios de Pago que se podrán utilizar en el Sitio</h2>

      <p>
      Los productos y servicios ofrecidos en este sitio, salvo que se señale una forma diferente de pago para casos particulares u ofertas de determinados bienes o servicios, podrán ser cancelados 
      utilizando los siguientes medios de pago permitidos en este sitio:
      </p>

      <p>
      a.    Tarjetas de Crédito o Débito. La opción de pago con tarjetas de crédito o débito, está habilitada para tarjetas tipo VISA, Master Card, DINERS o American Express. Asimismo, los pagos con tarjeta de 
      crédito o débito están sujetas a la aprobación del banco emisor de la tarjeta y a las validaciones internas de las pasarelas de pago encargadas de procesar la transacción. En los casos donde el pago no 
      es aprobado o rechazado, la orden de compra asociada será cancelada de manera automática por Reactivate Perú.
      </p>

      <p>
      Por otro lado, El Sitio pone a disposición del usuario la opción de pagar con su tarjeta de crédito en cuotas (hasta 48 cuotas). Sin embargo, es responsabilidad exclusiva del usuario seleccionar de manera 
      correcta las cuotas a pagar al momento de procesar el pago de su pedido, así como de verificar en la confirmación de compra que las cuotas elegidas son las correctas.
      </p>

      <p>
      Las transacciones mayores a S/. 1200.00 soles pasarán por un proceso de validación interna manual, con la finalidad de asegurar el correcto uso de la tarjeta; el cual, deberá ser atendido en un plazo no mayor a 48 horas hábiles.
      </p>

      <p>
      b.    Empresas de Recaudo. Es un medio de pago donde el cliente hace la reserva de su compra y se le genera un código de pago, con el cual deberá acercarse a cualquier establecimiento o agencias afiliadas a la empresa de recaudo 
      elegida por el cliente al momento de generar su pedido. El pago debe realizarse dentro del plazo que se establezca al momento de realizar la compra, caso contrario la orden de pedido se cancelará por falta de pago. Una vez realizado el pago, 
      la validación del mismo se realiza dentro de las 24 horas hábiles. Las empresas de recaudo que actualmente se encuentran habilitadas como medios de pago en El Sitio son:
      </p>

      <p>
      5.b.1.    PagoEfectivo: Compra con PagoEfectivo y paga a través de banca por internet o en cualquier oficina de Interbank, KasNet, BBVA, BCP, Scotiabank, BanBif, en agencias Wester Unión y en establecimientos autorizados que tengan el logotipo de 
      PagoEfectivo y/o Full Carga. La empresa PagoEfectivo no realiza operaciones por devolución de dinero, para los casos de reembolsos el cliente debe comunicarse únicamente con el área de atención al cliente de Reactivate Perú al correo hola@reactivate.pe
      </p>

      <p>
      5.b.2.    Safety Pay: Compra con Safety Pay y paga directamente a través de tu cuenta bancaria local en la moneda de tu elección.
      </p>

      <p>

      5.b.3.    Depósito Bancario: El cliente puede pagar directamente a una cuenta recaudadora de Reactivate Perú Perú en el banco Scotiabank, eligiendo este medio de pago. Para este medio de pago, es necesario tener en cuenta lo siguiente: 
      i) el plazo máximo para realizar el pago del pedido es de 48 horas calendario, ii) una vez realizado el pago, es responsabilidad del cliente enviar el voucher de pago a nuestro correo de contacto hola@reactivate.pe para realizar la aprobación del pedido.
      </p>

      <p>
      c.    Pago Contra entrega en Efectivo. Mediante este medio de pago el cliente tiene la posibilidad de realizar su compra y pagarla al momento de recibir su pedido al personal logístico encargado de la entrega. Sin embargo, las condiciones de este medio de pago 
      variaran de acuerdo a las políticas de pago de cada Empresa Vendedora. La opción de pago Contra entrega en efectivo, no está habilitada para ningún producto que supere los 20 kilogramos o tenga un precio de venta mayor o igual a los dos mil soles (S/. 2000.00)
      </p>

      <h2>6.   Formación del consentimiento en los contratos celebrados a través de este sitio</h2>

      <p>

      A través del Sitio web las empresas vendedoras realizarán ofertas de bienes y servicios, que podrán ser aceptadas a través de la aceptación, por vía electrónica, y utilizando los mecanismos que el mismo Sitio ofrece para ello. Toda aceptación de oferta quedará sujeta 
      a la condición suspensiva de que la Empresa Vendedora valide la transacción. En consecuencia, para toda operación que se efectúe en este Sitio, la confirmación y/o validación o verificación por parte de la Empresa Vendedora, será requisito para la formación del consentimiento. 
      Para validar la transacción la empresa vendedora deberá verificar: a) Que valida y acepta el medio de pago ofrecido por el usuario, c) Que los datos registrados por el cliente en el sitio coinciden con los proporcionados al efectuar su aceptación de oferta, d) Que el pago es 
      acreditado por el Usuario y e) Que la dirección de entrega se encuentre dentro del territorio nacional.
      </p>

      <p>
      Para informar al Usuario o consumidor acerca de esta validación, el Sitio deberá enviar una confirmación escrita a la misma dirección electrónica que haya registrado el Usuario aceptante de la oferta, o por cualquier medio de comunicación que garantice el debido y oportuno conocimiento 
      del consumidor, o mediante el envío efectivo del producto. El consentimiento se entenderá formado desde el momento en que se envía esta confirmación escrita al Usuario y en el lugar en que fue expedida. La oferta efectuada por el Usuario es irrevocable salvo en circunstancias excepcionales, 
      tales como que la Empresa Vendedora cambie sustancialmente la descripción del artículo después de realizada alguna oferta, o que exista un claro error tipográfico.
      </p>

      <p>
      Aviso Legal: La venta y despacho de los productos está condicionada a su disponibilidad y a las existencias de producto. Cuando el producto no se encuentre disponible, El Sitio notificará de inmediato al cliente y devolverá el valor total del precio pagado.
      </p>

      <h2>7.   Plazo de validez de la oferta y precio</h2>

      <p>
      El plazo de validez de la oferta es aquel que coincide con la fecha de vigencia indicada en la promoción o en virtud del agotamiento de las cantidades de productos disponibles para esa promoción debidamente informados al Usuario, o mientras la oferta se mantenga disponible, 
      el menor de éstos plazos. Cuando quiera que en una promoción no se indique una fecha de terminación se entenderá que la actividad se extenderá hasta el agotamiento de los inventarios correspondientes.
      </p>

      <p>
      Los precios de los productos y servicios disponibles en el Sitio, mientras aparezcan en él, solo tendrán vigencia y aplicación en éste y no serán aplicables a otros canales de venta utilizados por las empresas vendedoras, tales como 
      tiendas físicas, venta telefónica, otros sitios de venta por vía electrónica, catálogos u otros. Los precios de los productos ofrecidos en el Sitio están expresados en soles peruanos salvo que se manifieste lo contrario. Los precios 
      ofrecidos corresponden exclusivamente al valor del bien ofrecido y no incluyen gastos de transporte, manejo, envío, accesorios que no se describan expresamente ni ningún otro ítem adicional.
      </p>

      <p>
      Las empresas vendedoras podrán modificar cualquier información contenida en este Sitio, incluyendo las relacionadas con mercaderías, servicios, precios, existencias y condiciones, en cualquier momento y sin previo aviso, hasta el momento de recibir una aceptación de compra, 
      la cual obligará al Merchant Partner, sujeto a las condiciones de validación que se indican anteriormente, es decir, una vez que se haya formado el consentimiento entre las partes de una determinada transacción.
      </p>

       <h2>8.   Promociones y Campañas</h2>

       <p>
       Las promociones que se ofrezcan en este Sitio web no son necesariamente las mismas que ofrezcan otros canales de venta utilizados por las empresas, tales como tiendas físicas, 
       venta telefónica, catálogos u otros, a menos que se señale expresamente en este sitio o en la publicidad que realicen las empresas para cada promoción. Cuando el Sitio ofrezca promociones 
       que consistan en la entrega gratuita o rebajada de un producto por la compra de otro, el despacho del bien que se entregue gratuitamente o a precio rebajado, se hará en el mismo lugar en el 
       cual se despacha el producto comprado. El Sitio somete sus promociones y actividades promocionales al cumplimiento de las normas vigentes.
       </p>

       <p>
       Toda la información sobre nuestros términos y condiciones para nuestras campañas de marketing serán publicadas en Términos Legales de Campañas | https://reactivate.pe/legales
       </p>

       <p>
       Sobre el Uso de Cupones en la web.- Como parte de nuestras campañas promocionales, tanto el Sitio como las empresas vendedoras, impulsan por sus diferentes canales de promoción y marketing el uso de cupones de descuento para acceder a descuentos especiales por tiempo limitado. 
       El uso de un cupón promocional está sujeto tanto a condiciones generales y a condiciones o restricciones específicas, las cuales se detallan en la siguientes URL: https://Reactivate Perú.com/legales Es responsabilidad del Usuario, leer y comprender las condiciones y restricciones sobre el uso 
       de un cupón en particular; asimismo, es responsabilidad de Reactivate Perú, publicar de manera oportuna estas condiciones y/o restricciones en la web.
       </p>

      <h2>9.   Despacho de los productos</h2>

      <p>
      Los productos adquiridos a través del Sitio se sujetarán a las condiciones de despacho y entrega elegidas por el Usuario y disponibles en el Sitio. La información del lugar de envío es de 
      exclusiva responsabilidad del Usuario. Los plazos elegidos para el despacho y entrega, se cuentan desde que El Sitio válida la orden de compra y el medio de pago utilizado, considerándose 
      días hábiles para el cumplimiento de dicho plazo. Asimismo, El Sitio comunicará por correo electrónico a los Usuarios, los datos para que pueda realizar el seguimiento del estado del envío por 
      Internet.
      </p>

      <p>
      REMEAP E.I.R.L. ofrece una cobertura de despachos a nivel de Lima y Provincias, sin embargo, estas están sujetas a las políticas de despacho de cada Merchant Partner y a la accesibilidad de los destinos, 
      esto será identificado por el Usuario al momento de realizar su compra y elegir el DEPARTAMENTO, PROVINCIA Y DISTRITO de destino.
      </p>

      <p>
      REMEAP E.I.R.L. garantiza un (01) intento de entrega a la dirección que el Usuario indicó en su orden de compra. En tal sentido, Si en la primera visita el Usuario está ausente o no dan razón de él, 
      el transportista informará a Reactivate Perú la visita realizada; asimismo, dejará registro de ella mediante una fotografía al inmueble visitado o dejando una constancia física “debajo de la puerta” 
      donde se indica la fecha de la misma, y el detalle físico del domicilio. En tal sentido, es responsabilidad del cliente mantenerse informado sobre el estado de su pedido y sobre las notificaciones que 
      pueda recibir a su correo electrónico o teléfono celular con respecto a la visita del Courier. Asimismo, tener claro que no es obligación de Reactivate Perú, la tienda vendedora o del Courier asignado; 
      coordinar previamente una fecha o horario de entrega.

      </p>

      <p>
      Reactivate Perú no garantiza un segundo intento de entrega; no obstante, con el afán de optimizar su servicio el Courier puede optar por hacer un segundo intento de entrega si es que no tuvo éxito en la primera visita; 
      de ser así, esta se dará al día siguiente del primer intento fallido y sin la obligación de una coordinación previa. En tal sentido, si el cliente nuevamente se encuentra ausente, el paquete retornará a los almacenes del Courier. 
      El cliente puede solicitar una tercera visita, sin embargo, esta dependerá de las políticas de despacho de cada Merchant Partner y está sujeta al pago del costo logístico.
      </p>

      <p>
      Conformidad del Paquete Recibido
      </p>

      <p>
      Cuando el Usuario recibe un producto, deberá revisar que la caja o bolsa que contenga el producto, esté sellado y no tenga signos de apertura previa. En caso detecte esto, 
      no deberá recibir el producto y deberá ponerse en contactos inmediatamente con El Sitio. En caso que el producto fuera recibido en buenas condiciones y completo, el Usuario 
      irmará la Guía de Remisión y Boleta de Venta o Factura, dejando así conformidad de la entrega y producto recibido. Luego de la aceptación del producto y firma documentaria, 
      el Usuario no podrá presentar reclamo por daño del producto o faltante del mismo, sólo se atenderán reclamos por temas de garantía o cualquiera descrita dentro de la Política 
      de Devolución y Cambios.
      </p>

      <p>
      Cada Tienda Vendedora, al realizar la entrega de un producto de grandes dimensiones, envía con el transportista, un “FORMATO DE CONFORMIDAD DE ENTREGA”, donde el cliente debe firmar al recibir, 
      dejando constancia que, realizó la revisión física externa del producto y que este se encuentra en buenas condiciones. De tener alguna observación al momento de la recepción, no debe recibir el 
      producto ni firmar ningún documento, y ponerse en contacto inmediatamente con Reactivate Perú; asimismo el transportista deberá llevarse el producto. Luego de la aceptación del producto y firma 
      documentaria, el Usuario no podrá presentar reclamo por daño de producto o faltante del mismo, sólo se atenderán reclamos por temas de garantía o cualquiera descrita dentro de la Política de
      Devolución y Cambios.

      </p>

      <p>

      El Transportista al realizar la entrega de productos de grandes dimensiones, no está facultado ni está autorizado de realizar maniobras especiales, llámese desmontaje de puertas ni ventanas, 
      ingreso del producto con poleas, sogas, etc. La entrega se realizará hasta un máximo de 3 pisos, siempre y cuando el acceso al mismo sea viable (escaleras amplias o ascensor de grandes dimensiones). 
      No se ingresará el producto por balcones, ventanas ni tragaluz.

      </p>

      <p>

      El Transportista no realiza ni instalaciones ni armados de productos (a menos que lo diga expresamente en la descripción de producto).
      </p>

  <h2>10.   Política de Devolución o Cambio por derecho de devolución</h2>

      <p> 
      Todas las tiendas y/o marcas que venden en www.reactivate.pe están comprometidas a que el cliente se encuentre completamente satisfecho durante toda su experiencia de compra. Sin embargo, somos conscientes 
      de que en ciertas ocasiones es posible que quieras devolver o cambiar un producto. En ese sentido, Los Merchants tienen la responsabilidad de publicar sus políticas de cambios, devoluciones y garantías en 
      cada página de información de producto (product page). Asimismo, es responsabilidad de cada comprador/usuario revisar estas políticas antes de realizar la compra de cualquier producto. No obstante, cabe señalar 
      que estas políticas no afectan los derechos del cliente estipulados en la Ley 29571 del Código de Defensa del Consumidor.
      </p>

      <p>
      Las solicitudes de cambios y devoluciones serán recibidas y atendidas por nuestro equipo de Servicio al Cliente, que tiene como principal objetivo garantizar una respuesta rápida y oportuna, velando en todo momento 
      que Los Merchants cumplan con entregar un óptimo servicio de pre y post venta a todos nuestros clientes.
      </p>

      <p>
      Para mayor información sobre políticas de devolución, ingrese a https://reactivate.pe/pages/changes
      </p>

    <h2>11.   Política de Garantías</h2>  

      <p>
      En caso que un producto adquirido a través de www.reactivate.pe presente problemas de funcionamiento, el cliente podrá contactar al Equipo de Servicio al Cliente de Reactivate Perú quien proporcionará los datos de la 
      Empresa Vendedora para que éste le brinde un soporte adecuado a su solicitud de garantía.
      </p>

      <p>
      La garantía del vendedor o la marca inicia después de haberse cumplido los 7 días hábiles desde la entrega del producto. El tiempo de garantía lo establece cada empresa vendedora, así como los términos para hacer efectiva 
      la misma. En ese sentido, Reactivate Perú velará para que los casos presentados sean atendidos de manera oportuna por cada tienda; sin embargo, no se hace responsable por los fallos que determine el vendedor luego de inspeccionar un producto.
      </p>

      <p>
      Condiciones Generales:
      </p>

      <p>
      Los accesorios no cuentan con garantía.
      Cada producto cuenta con un plazo de garantía determinado en las características del producto señalados en www.reactivate.pe
      </p>

      <p>
      Todas las solicitudes de garantías deben cumplir con las siguientes consideraciones:
      </p>

      <p>
      La garantía del producto debe estar vigente.
      El producto debe contar con boleta o factura y documentos de garantía. Si el producto no tiene un documento que certifique el periodo de garantía, 
      el producto tendrá la garantía indicada dentro de las características del producto.
      El daño del producto debe ser por un defecto de fabricación, falla técnica o irregularidad.
      Ninguna garantía se aplicará si el producto presenta señales de mal uso por parte del cliente o cuando se detecte que fue maniobrado por personal técnico no autorizado.
      </p>

      <p>
      Ante la aplicación de la garantía, los representantes de la marca (personal técnico autorizado) determinarán, previa evaluación del producto, si procede la atención por 
      garantía y entregarán al cliente un informe técnico en señal de conformidad.
      </p>

      <p>
      La asistencia técnica se realizará dentro de los treinta (30) días hábiles siguientes, contados a partir del día siguiente a la entrega del producto a la empresa vendedora. 
      En casos complejos, dicho plazo puede extenderse por otro de quince (15) días hábiles acabado el primer plazo, lo cual le será comunicado oportunamente vía correo electrónico al cliente.
      </p>

      <p>
      En caso se verifique la falla o defecto de fábrica, la Empresa Vendedora deberá reparar, reponer el producto (sujeto a la disponibilidad del stock actual) o reembolsar el costo del 
      producto (no incluye flete), esto dependerá del informe técnico emitido por el proveedor o la marca.
      </p>

      <p>
      En caso de la reposición del producto, se le entregará uno nuevo, sin costo alguno en el plazo de los quince (15) días hábiles siguientes luego de que se notifique al cliente el informe 
      técnico con la aceptación de la garantía. La reposición del producto, siempre se encontrará sujeta a la disponibilidad del mismo y correrá bajo responsabilidad de la Empresa Vendedora.
      </p>

      <p>
      En caso el cliente decida requerir la devolución de dinero, esta se realizará de la siguiente manera:
      </p>

      <p>

      A partir del día siguiente de la aceptación de la garantía por parte del merchant partner y su posterior comunicación al cliente, 
      Reactivate Perú tiene hasta 15 días hábiles para efectuar el reembolso. De devolverse el monto pagado, se tomará como base el valor del producto 
      (no incluye gastos de envío).
      </p>

      <p>
      El tiempo que duren las verificaciones o reparaciones efectuadas al amparo de la garantía no es computable dentro del plazo de la misma. 
      En el caso de reposición del producto, se renovará el plazo de la garantía.
      </p>

      <p>
      Si la garantía no aplica, el producto se enviará de regreso al cliente con la razón del rechazo por escrito.
      </p>

      <p>
      Adicionalmente, las condiciones para aceptar un proceso de garantías dependen de la categoría de cada producto y estas estarán 
      publicadas en las políticas de garantía de cada uno de estos.
      </p>

   <h2>11.   Comprobantes de pago</h2>  

      <p>
      Según el reglamento de Comprobantes de Pago aprobado por la Resolución de Superintendencia N° 007-99 / SUNAT (RCP) y el Texto Único Ordenado de la Ley 
      del Impuesto General a las Ventas e Impuesto Selectivo al Consumo, aprobado mediante Decreto Supremo N° 055-99-EF y normas modificatorias (TUO del IGV): 
      “No existe ningún procedimiento vigente que permita el canje de boletas de venta por facturas, más aún las notas de crédito no se encuentran previstas para 
      modificar al adquirente o usuario que figura en el comprobante de pago original”.
      </p>

      <p>
      Teniendo en cuenta esta resolución, es obligación del consumidor decidir correctamente el documento que solicitará como comprobante al momento de su compra, 
      ya que según los párrafos citados no procederá cambio alguno.
      </p>

    <h2>12.   Reembolsos</h2>

    <p>
    Luego que el reembolso es aprobado y ejecutado, el tiempo de procesamiento varía según el método de pago usado.
    </p>

    <p>
    Para una compra con tarjeta de crédito, débito o métodos que permitan la devolución del dinero a través de una cuenta asociada, 
    se hará el reverso a la tarjeta o a la cuenta asociada.
    </p>

    <p>
    Para métodos por depósito bancario o pagos en efectivo, se hará un depósito bancario.
    </p>

    <p>
     Tiempos de procesamiento:
    </p>

    <p>
    Reverso a la tarjeta: El tiempo del reembolso a una tarjeta puede ser hasta 21 días hábiles. En ambos casos, el tiempo de procesamiento es 
    responsabilidad de la entidad financiera que emitió la tarjeta y es contado desde la ejecución del reembolso.
    </p>

    <p>
    Depósito bancario: Para recibir el dinero en una cuenta bancaria, el titular de la cuenta debe ser el mismo que realizó la compra en www.reactivate.pe. 
    El tiempo de procesamiento es de 4 días hábiles desde su ejecución. La información bancaria proporcionada por el cliente debe ser correcta para evitar 
    retrasos en la atención. De no ser así los tiempos de ejecución y procesamiento se prolongarán.
    </p>

    <p>
    Los datos necesarios son:
    </p>

    <p>
    Nombre y apellido,
    DNI, Carnet de extranjería o Pasaporte,
    Número de orden,
    Correo electrónico registrado en www.reactivate.pe,
    Datos de la cuenta bancaria
    </p>

    <h2>14. Propiedad Intelectual    </h2>

    <p>
    Todo el contenido incluido o puesto a disposición del Usuario en el Sitio, incluyendo textos, gráficas, logos, íconos, imágenes, archivos de audio, descargas 
    digitales y cualquier otra información (el "Contenido"), es de propiedad de REMEAP E.I.R.L. o ha sido licenciada a ésta por las Empresas Vendedoras. La compilación del 
    Contenido es propiedad exclusiva de REMEAP E.I.R.L. y, en tal sentido, el Usuario debe abstenerse de extraer y/o reutilizar partes del Contenido sin el consentimiento 
    previo y expreso de la Empresa.

    </p>

    <p>

    Además del Contenido, las marcas, denominativas o figurativas, marcas de servicio, diseños industriales y cualquier otro elemento de propiedad intelectual 
    que haga parte del Contenido (la "Propiedad Industrial"), son de propiedad de REMEAP E.I.R.L. o de las Empresas Vendedoras y, por tal razón, están protegidas 
    por las leyes y los tratados internacionales de derecho de autor, marcas, patentes, modelos y diseños industriales. El uso indebido y la reproducción total o 
    parcial de dichos contenidos quedan prohibidos, salvo autorización expresa y por escrito de REMEAP E.I.R.L., asimismo, no pueden ser usadas por los Usuarios 
    en conexión con cualquier producto o servicio que no sea provisto por REMEAP E.I.R.L. En el mismo sentido, la Propiedad Industrial no podrá ser usada por los 
    Usuarios en conexión con cualquier producto y servicio que no sea de aquellos que comercializan dentro del Sitio o de forma que produzca confusión con sus 
    clientes o que desacredite a la Empresa o a las Empresas Vendedoras

    </p>

    <h2> 15. Propiedad Intelectual DE TERCEROS  </h2>

    <p>

    REMEAP E.I.R.L. es una empresa respetuosa de las leyes y no pretende aprovecharse de la reputación de terceros, apropiándose de la propiedad intelectual por ellos 
    protegida. Por lo anterior contamos con herramientas que buscan asegurar que productos que se adquieran a través de nuestra página sean originales y hayan ingresado 
    legalmente al país. Teniendo en cuenta lo anterior, si usted sospecha que algún producto que se encuentra en nuestra página infringe derecho de propiedad intelectual 
    de terceros o infringe derechos legalmente protegido por usted, agradecemos notificarnoslo para desactivar dichos productos inmediatamente de nuestra página e iniciar 
    todas las acciones tendientes a evitar que esto siga sucediendo.

    </p>

    <h2>16. Responsabilidad de Reactivate Perú PERÚ   </h2>

    <p>

    REMEAP E.I.R.L. hará lo posible dentro de sus capacidades para que la transmisión del Sitio sea ininterrumpida y libre de errores. Sin embargo, dada la naturaleza de la 
    Internet, dichas condiciones no pueden ser garantizadas. En el mismo sentido, el acceso del Usuario a la Cuenta puede ser ocasionalmente restringido o suspendido con el 
    objeto de efectuar reparaciones, mantenimiento o introducir nuevos Servicios. REMEAP E.I.R.L. no será responsable por pérdidas (i) que no hayan sido causadas por el 
    incumplimiento de sus obligaciones; (ii) lucro cesante o pérdidas de oportunidades comerciales; (iii) cualquier daño indirecto.

    </p>

    <h2>17.  Indemnización  </h2>

    <p>

    El Usuario indemnizará y mantendrá indemne a REMEAP E.I.R.L., sus filiales, empresas controladas y/o controlantes, directivos, administradores, representantes y empleados, 
    por su incumplimiento en los Términos y Condiciones Generales y demás Políticas que se entienden incorporadas al presente o por la violación de cualesquiera leyes o derechos 
    de terceros, incluyendo los honorarios de abogados en una cantidad razonable.

    </p>

    <h2>18. Términos de Ley </h2>

    <p>

    Este acuerdo será gobernado e interpretado de acuerdo con las leyes de Perú, sin dar efecto a cualquier principio de conflictos de ley. Si alguna disposición de estos Términos y   
    Condiciones es declarada ilegal, o presenta un vacío, o por cualquier razón resulta inaplicable, la misma deberá ser interpretada dentro del marco del mismo y en cualquier caso no 
    afectará la validez y la aplicabilidad de las provisiones restantes.

    </p>

   
    <h2>19. Notificaciones </h2>

    <p>
    Cualquier comentario, inquietud o reclamación respecto de los anteriores Términos y Condiciones, la Política de Privacidad, o la ejecución de cualquiera de éstos, deberá ser notificada 
    por escrito a Calle Manuel Augusto Olaechea 205, Miraflores, Lima, al correo electrónico: hola@reactivate.pe o al teléfono (+51) 997 583 233.

    </p>

    <h2>20. Notificaciones </h2>

    <p>
    Este acuerdo estará regido en todos sus puntos por las leyes vigentes en la República del Perú. Cualquier controversia derivada del presente acuerdo, su existencia, validez, interpretación, 
    alcance o cumplimiento, será sometida a los tribunales competentes de la ciudad de Lima, Perú.

    </p>



    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;

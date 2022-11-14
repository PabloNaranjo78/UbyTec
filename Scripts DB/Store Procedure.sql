-- REPARTIDOR TELEFONOS
CREATE OR REPLACE PROCEDURE AddRepartidor_Telefonos(
	usuarioRep_ VARCHAR,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO repartidor_telefonos(usuarioRep,telefono)
	VALUES (usuarioRep_,telefono_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetRepartidor_Telefonos()
RETURNS setof repartidor_telefonos
language sql
AS
$$
	select usuarioRep,telefono from public.repartidor_telefonos
	ORDER BY usuarioRep ASC;
$$;


CREATE OR REPLACE FUNCTION GetRepartidor_TelefonosByID(
	usuarioRep_ varchar
)
RETURNS setof repartidor_telefonos
language sql
AS $$
	select usuarioRep,telefono from public.repartidor_telefonos
	where repartidor_telefonos.usuarioRep = usuarioRep_;
$$;


CREATE OR REPLACE PROCEDURE DeleteRepartidor_Telefonos(
	usuarioRep_ VARCHAR,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM repartidor_telefonos WHERE usuarioRep=usuarioRep_ and telefono = telefono_;
	commit;
END
$$;


-- REPARTIDOR
CREATE OR REPLACE PROCEDURE AddRepartidor(
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	disponible_ BOOLEAN,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	INSERT INTO repartidor(usuario,pass,nombre,apellidos,disponible,provincia,canton,distrito)
	VALUES (usuario_,pass_,nombre_,apellidos_,disponible_,provincia_,canton_,distrito_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetRepartidor()
RETURNS setof repartidor
language sql
AS
$$
	select usuario,pass,nombre,apellidos,disponible,provincia,canton,distrito from public.repartidor
	ORDER BY usuario ASC;
$$;

--drop function GetRepartidores()
CREATE OR REPLACE FUNCTION GetRepartidorByID(
	usuario_ varchar
)
RETURNS setof repartidor
language sql
AS $$
	select usuario,pass,nombre,apellidos,disponible,provincia,canton,distrito from repartidor
	where repartidor.usuario = usuario_;
$$;


CREATE OR REPLACE PROCEDURE UpdateRepartidor(
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	disponible_ BOOLEAN,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	UPDATE repartidor SET pass=pass_,nombre=nombre_,apellidos=apellidos_,disponible=disponible,
	provincia=provincia_,canton=canton_,distrito=distrito_ WHERE usuario=usuario_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeleteRepartidor(
	usuario_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	DELETE FROM repartidor WHERE usuario=usuario_;
	commit;
END
$$;


-- EMPLEADO TELEFONOS
CREATE OR REPLACE PROCEDURE AddEmpleado_Telefonos(
	idEmpleado_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO empleado_telefonos(idEmpleado,telefono)
	VALUES (idEmpleado_,telefono_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetEmpleado_Telefonos()
RETURNS setof empleado_telefonos
language sql
AS
$$
	select idEmpleado,telefono from public.empleado_telefonos
	ORDER BY idEmpleado ASC;
$$;


CREATE OR REPLACE FUNCTION GetEmpleado_TelefonosByID(
	idEmpleado_ int
)
RETURNS setof empleado_telefonos
language sql
AS $$
	select idEmpleado,telefono from public.empleado_telefonos
	where empleado_telefonos.idEmpleado = idEmpleado_;
$$;


CREATE OR REPLACE PROCEDURE DeleteEmpleado_Telefonos(
	idEmpleado_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM empleado_telefonos WHERE idEmpleado=idEmpleado_ and telefono = telefono_;
	commit;
END
$$;



--EMPLEADO

CREATE OR REPLACE PROCEDURE AddEmpleado(
	idEmpleado_ int,
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	INSERT INTO empleado(idEmpleado,usuario,pass,nombre,apellidos,provincia,canton,distrito)
	VALUES (idEmpleado_,usuario_,pass_,nombre_,apellidos_,provincia_,canton_,distrito_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetEmpleado()
RETURNS setof empleado
language sql
AS
$$
	select idEmpleado,usuario,pass,nombre,apellidos,provincia,canton,distrito from public.empleado
	ORDER BY idEmpleado ASC;
$$;

CREATE OR REPLACE FUNCTION GetEmpleadoByID(
	idEmpleado_ int
)
RETURNS setof empleado
language sql
AS $$
	select idEmpleado,usuario,pass,nombre,apellidos,provincia,canton,distrito from empleado
	where empleado.idEmpleado = idEmpleado_;
$$;


CREATE OR REPLACE PROCEDURE UpdateEmpleado(
	idEmpleado_ int,
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	UPDATE empleado SET usuario=usuario_, pass=pass_,nombre=nombre_,apellidos=apellidos_,
	provincia=provincia_,canton=canton_,distrito=distrito_ WHERE idEmpleado=idEmpleado_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeleteEmpleado(
	idEmpleado_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM empleado WHERE idEmpleado=idEmpleado_;
	commit;
END
$$;


-- ADMIN COMER TELEFONOS
CREATE OR REPLACE PROCEDURE AddAdmin_Comer_Telefonos(
	idAdmin_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO admin_comer_telefonos(idAdmin,telefono)
	VALUES (idAdmin_,telefono_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetAdmin_Comer_Telefonos()
RETURNS setof admin_comer_telefonos
language sql
AS
$$
	select idAdmin,telefono from public.admin_comer_telefonos
	ORDER BY idAdmin ASC;
$$;


CREATE OR REPLACE FUNCTION GetAdmin_Comer_TelefonosByID(
	idAdmin_ int
)
RETURNS setof admin_comer_telefonos
language sql
AS $$
	select idAdmin,telefono from public.admin_comer_telefonos
	where admin_comer_telefonos.idAdmin = idAdmin_;
$$;


CREATE OR REPLACE PROCEDURE DeleteAdmin_Comer_Telefonos(
	idAdmin_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM admin_comer_telefonos WHERE idAdmin=idAdmin_ and telefono = telefono_;
	commit;
END
$$;



--ADMIN COMERCIO

CREATE OR REPLACE PROCEDURE AddAdmin_Comercio(
	idAdmin_ int,
	idComercio_ int,
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	correo_ VARCHAR,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	INSERT INTO admin_comercio(idAdmin,idComercio,usuario,pass,nombre,apellidos,correo,provincia,canton,distrito)
	VALUES (idAdmin_,idComercio_,usuario_,pass_,nombre_,apellidos_,correo_,provincia_,canton_,distrito_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetAdmin_Comercio()
RETURNS setof admin_comercio
language sql
AS
$$
	select idAdmin,usuario,pass,nombre,apellidos,correo,provincia,canton,distrito,idComercio from public.admin_comercio
$$;

CREATE OR REPLACE FUNCTION GetAdmin_ComercioByID(
	idAdmin_ int
)
RETURNS setof admin_comercio
language sql
AS $$
	select idAdmin,usuario,pass,nombre,apellidos,correo,provincia,canton,distrito,idComercio from admin_comercio
	where admin_comercio.idAdmin = idAdmin_;
$$;


CREATE OR REPLACE PROCEDURE UpdateAdmin_Comercio(
	idAdmin_ int,
	idComercio_ int,
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	correo_ VARCHAR,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	UPDATE admin_comercio SET idComercio=idComercio_,usuario=usuario_, pass=pass_,nombre=nombre_,apellidos=apellidos_,
	correo=correo_,provincia=provincia_,canton=canton_,distrito=distrito_ WHERE idAdmin=idAdmin_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeleteAdmin_Comercio(
	idAdmin_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM admin_comercio WHERE idAdmin=idAdmin_;
	commit;
END
$$;


--COMERCIO

CREATE OR REPLACE PROCEDURE AddComercio(
	idComercio_ int,
	pass_ VARCHAR,
	tipo_ VARCHAR,
	nombre_ VARCHAR,
	correo_ VARCHAR,
	sinpe_ int,
	solicitud_ BOOLEAN,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	INSERT INTO comercio(idComercio,pass,tipo,nombre,correo,sinpe,solicitud,provincia,canton,distrito)
	VALUES (idComercio_,pass_,tipo_,nombre_,correo_,sinpe_,solicitud_,provincia_,canton_,distrito_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetComercio()
RETURNS setof comercio
language sql
AS
$$
	select idComercio,pass,tipo,nombre,correo,sinpe,solicitud,provincia,canton,distrito from public.comercio
	ORDER BY idComercio ASC;
$$;

CREATE OR REPLACE FUNCTION GetComercioByID(
	idComercio_ int
)
RETURNS setof comercio
language sql
AS $$
	select idComercio,pass,tipo,nombre,correo,sinpe,solicitud,provincia,canton,distrito from comercio
	where comercio.idComercio = idComercio_;
$$;


CREATE OR REPLACE PROCEDURE UpdateComercio(
	idComercio_ int,
	pass_ VARCHAR,
	tipo_ VARCHAR,
	nombre_ VARCHAR,
	correo_ VARCHAR,
	sinpe_ int,
	solicitud_ BOOLEAN,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	UPDATE comercio SET pass=pass_,tipo=tipo_,nombre=nombre_,correo=correo_,sinpe=sinpe_,solicitud=solicitud_,
	provincia=provincia_,canton=canton_,distrito=distrito_ WHERE idComercio = idComercio_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeleteComercio(
	idComercio_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM comercio WHERE idComercio=idComercio_;
	commit;
END
$$;



-- COMERCIO TELEFONOS
CREATE OR REPLACE PROCEDURE AddComercio_Telefonos(
	idComercio_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO comercio_telefonos(idComercio,telefono)
	VALUES (idComercio_,telefono_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetComercio_Telefonos()
RETURNS setof comercio_telefonos
language sql
AS
$$
	select idComercio,telefono from public.comercio_telefonos
	ORDER BY idComercio ASC;
$$;


CREATE OR REPLACE FUNCTION GetComercio_TelefonosByID(
	idComercio_ int
)
RETURNS setof comercio_telefonos
language sql
AS $$
	select idComercio,telefono from public.comercio_telefonos
	where comercio_telefonos.idComercio = idComercio_;
$$;


CREATE OR REPLACE PROCEDURE DeleteComercio_Telefonos(
	idComercio_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM comercio_telefonos WHERE idComercio=idComercio_ and telefono = telefono_;
	commit;
END
$$;


-- PRODUCTO FOTOS
CREATE OR REPLACE PROCEDURE AddProducto_Fotos(
	producto_ VARCHAR,
	foto_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	INSERT INTO producto_fotos(producto,foto)
	VALUES (producto_,foto_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetProducto_Fotos()
RETURNS setof producto_fotos
language sql
AS
$$
	select producto,foto from public.producto_fotos
	ORDER BY producto ASC;
$$;


CREATE OR REPLACE FUNCTION GetProducto_FotosByID(
	producto_ VARCHAR
)
RETURNS setof producto_fotos
language sql
AS $$
	select producto,foto from public.producto_fotos
	where producto_fotos.producto = producto_;
$$;


CREATE OR REPLACE PROCEDURE DeleteProducto_Fotos(
	producto_ VARCHAR,
	foto_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	DELETE FROM producto_fotos WHERE producto=producto_ and foto = foto_;
	commit;
END
$$;



--PRODUCTO

CREATE OR REPLACE PROCEDURE AddProducto(
	nombre_ VARCHAR,
	precio_ int,
	categoria_ VARCHAR,
	idComercio_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO producto(nombre,precio,categoria,idComercio)
	VALUES (nombre_,precio_,categoria_,idComercio_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetProducto()
RETURNS setof producto
language sql
AS
$$
	select nombre,precio,categoria,idComercio from public.producto
	ORDER BY nombre ASC;
$$;

CREATE OR REPLACE FUNCTION GetProductoByID(
	nombre_ varchar
)
RETURNS setof producto
language sql
AS $$
	select nombre,precio,categoria,idComercio from producto
	where producto.nombre = nombre_;
$$;


CREATE OR REPLACE PROCEDURE UpdateProducto(
	nombre_ VARCHAR,
	precio_ int,
	categoria_ VARCHAR,
	idComercio_ int
)
language plpgsql
AS $$
BEGIN
	UPDATE producto SET precio=precio_,categoria=categoria_,idComercio=idComercio_
	WHERE nombre = nombre_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeleteProducto(
	nombre_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	DELETE FROM producto WHERE nombre=nombre_;
	commit;
END
$$;



--PRODUCTOS PEDIDOS

CREATE OR REPLACE PROCEDURE AddProducto_Pedido(
	idPedido_ int,
	producto_ VARCHAR,
	cantidad_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO producto_pedido(idPedido,producto,cantidad)
	VALUES (idPedido_,producto_,cantidad_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetProducto_Pedido()
RETURNS setof producto_pedido
language sql
AS
$$
	select idPedido,producto,cantidad from public.producto_pedido
	ORDER BY idPedido ASC;
$$;

CREATE OR REPLACE FUNCTION GetProducto_PedidoByID(
	idPedido_ int
)
RETURNS setof producto_pedido
language sql
AS $$
	select idPedido,producto,cantidad from producto_pedido
	where producto_pedido.idPedido = idPedido_;
$$;


CREATE OR REPLACE PROCEDURE UpdateProducto_Pedido(
	idPedido_ int,
	producto_ VARCHAR,
	cantidad_ int
)
language plpgsql
AS $$
BEGIN
	UPDATE producto_pedido SET cantidad=cantidad_
	WHERE idPedido=idPedido_ and producto=producto_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeleteProducto_Pedido(
	idPedido_ int,
	producto_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	DELETE FROM producto_pedido WHERE idPedido=idPedido_ and producto=producto_;
	commit;
END
$$;


--PEDIDO

CREATE OR REPLACE PROCEDURE AddPedido(
	
	idPedido_ int,
	direccion_ VARCHAR,
	finalizado_ BOOLEAN,
	repartidor_ VARCHAR,
	idCliente_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO pedido(idPedido,direccion,finalizado,repartidor,idCliente)
	VALUES (idPedido_,direccion_,finalizado_,repartidor_,idCliente_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetPedido()
RETURNS setof pedido
language sql
AS
$$
	select idPedido,direccion,finalizado,repartidor,idCliente from public.pedido
	ORDER BY idPedido ASC;
$$;

CREATE OR REPLACE FUNCTION GetPedidoByID(
	idPedido_ int
)
RETURNS setof pedido
language sql
AS $$
	select idPedido,direccion,finalizado,repartidor,idCliente from pedido
	where pedido.idPedido = idPedido_;
$$;

CREATE OR REPLACE PROCEDURE UpdatePedido(
	idPedido_ int,
	direccion_ VARCHAR,
	finalizado_ BOOLEAN,
	repartidor_ VARCHAR,
	idCliente_ int
)
language plpgsql
AS $$
BEGIN
	UPDATE pedido SET direccion=direccion_,finalizado=finalizado_,repartidor=repartidor_,idCliente=idCliente_
	WHERE idPedido = idPedido_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeletePedido(
	idPedido_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM pedido WHERE idPedido = idPedido_;
	commit;
END
$$;


-- CLIENTE TELEFONOS
CREATE OR REPLACE PROCEDURE AddCliente_Telefonos(
	idCliente_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	INSERT INTO cliente_telefonos(idCliente,telefono)
	VALUES (idCliente_,telefono_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetCliente_Telefonos()
RETURNS setof cliente_telefonos
language sql
AS
$$
	select idCliente,telefono from public.cliente_telefonos
	ORDER BY idCliente ASC;
$$;


CREATE OR REPLACE FUNCTION GetCliente_TelefonosByID(
	idCliente_ int
)
RETURNS setof cliente_telefonos
language sql
AS $$
	select idCliente,telefono from public.cliente_telefonos
	where cliente_telefonos.idCliente = idCliente_;
$$;


CREATE OR REPLACE PROCEDURE DeleteCliente_Telefonos(
	idCliente_ int,
	telefono_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM cliente_telefonos WHERE idCliente=idCliente_ and telefono = telefono_;
	commit;
END
$$;


--CLIENTE

CREATE OR REPLACE PROCEDURE AddCliente(
	idCliente_ int,
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	fechaNac_ VARCHAR,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
)
language plpgsql
AS $$
BEGIN
	INSERT INTO cliente(idCliente,usuario,pass,nombre,apellidos,fechaNac,provincia,canton,distrito)
	VALUES (idCliente_,usuario_,pass_,nombre_,apellidos_,fechaNac_,provincia_,canton_,distrito_);
	commit;
END
$$;


CREATE OR REPLACE FUNCTION GetCliente()
RETURNS setof cliente
language sql
AS
$$
	select idCliente,usuario,pass,nombre,apellidos,fechaNac,provincia,canton,distrito from public.cliente
	ORDER BY idCliente ASC;
$$;

CREATE OR REPLACE FUNCTION GetClienteByID(
	idCliente_ int
)
RETURNS setof cliente
language sql
AS $$
	select idCliente,usuario,pass,nombre,apellidos,fechaNac,provincia,canton,distrito from cliente
	where cliente.idCliente = idCliente_;
$$;


CREATE OR REPLACE PROCEDURE UpdateCliente(
	idCliente_ int,
	usuario_ VARCHAR,
	pass_ VARCHAR,
	nombre_ VARCHAR,
	apellidos_ VARCHAR,
	fechaNac_ VARCHAR,
	provincia_ VARCHAR,
	canton_ VARCHAR,
	distrito_ VARCHAR
	)
language plpgsql
AS $$
BEGIN
	UPDATE cliente SET usuario=usuario_,pass=pass_,nombre=nombre_,apellidos=apellidos_,fechaNac=fechaNac_,
	provincia=provincia_,canton=canton_,distrito=distrito_ 
	WHERE idCliente=idCliente_;
	commit;
END
$$;


CREATE OR REPLACE PROCEDURE DeleteCliente(
	idCliente_ int
)
language plpgsql
AS $$
BEGIN
	DELETE FROM cliente WHERE idCliente=idCliente_;
	commit;
END
$$;


--Valida empleado

CREATE OR REPLACE FUNCTION ValidaEmpleado(
	idEmpleado_ int,
	pass_ VARCHAR
)
RETURNS setof empleado
language sql
AS $$
	select idEmpleado,usuario,pass,nombre,apellidos,provincia,canton,distrito from empleado
	where empleado.idEmpleado = idEmpleado_ and empleado.pass = pass_;
$$;


--Valida comercio

CREATE OR REPLACE FUNCTION ValidaComercio(
	idComercio_ int,
	pass_ VARCHAR
)
RETURNS setof comercio
language sql
AS $$
	select idComercio,pass,tipo,nombre,correo,sinpe,solicitud,provincia,canton,distrito from comercio
	where comercio.idComercio = idComercio_ and comercio.pass = pass_;
$$;


--Valida cliente
CREATE OR REPLACE FUNCTION ValidaCliente(
	idCliente_ int,
	pass_ VARCHAR
)
RETURNS setof cliente
language sql
AS $$
	select idCliente,usuario,pass,nombre,apellidos,fechaNac,provincia,canton,distrito from cliente
	where cliente.idCliente = idCliente_ and cliente.pass = pass_;
$$;

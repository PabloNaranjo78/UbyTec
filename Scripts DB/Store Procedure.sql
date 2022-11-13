CREATE OR REPLACE FUNCTION GetRepartidores()
RETURNS setof repartidor
language sql
AS
$$
	select usuario,pass,nombre,apellidos,disponible,provincia,canton,distrito from public.repartidor
	ORDER BY usuario ASC;
$$;

--drop function GetRepartidoresByID(usuario varchar)
CREATE OR REPLACE FUNCTION GetRepartidoresByID(
	usuario_ varchar
)
RETURNS setof repartidor
language sql
AS $$
	select usuario,pass,nombre,apellidos,disponible,provincia,canton,distrito from repartidor
	where repartidor.usuario = usuario_;
$$;

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



CALL AddRepartidor('usuario','pass','nombre','apellidos','true','provincia','canton','distrito');
CALL UpdateRepartidor('usuario','pass2','nomb2re','a2pellidos','true','pro2vincia','can2ton','dis2trito');
CALL DeleteRepartidor('usuario');
SELECT * FROM GetRepartidores();
SELECT * from GetRepartidoresByID('usuario');

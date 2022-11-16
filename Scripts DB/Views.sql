CREATE VIEW Ventas_Afiliado 
AS

SELECT comercio.nombre AS Afiliado, count(pedido.idPedido) AS Compras, SUM(producto.precio * producto_pedido.cantidad) AS Monto_Total, SUM(producto.precio * producto_pedido.cantidad) * 0.05 AS Monto_Servicio
FROM (((pedido JOIN producto_pedido  ON pedido.idPedido=producto_pedido.idPedido) 
JOIN Producto ON producto=producto.nombre) 
			   JOIN comercio ON producto.idComercio = comercio.idComercio )
			   WHERE Pedido.finalizado = TRUE  GROUP BY comercio.idComercio




Select * from Ventas_Afiliado;


create or replace function totales3()
    returns table
            (
                afiliado VARCHAR,
				compras bigint, 
				Monto_Total bigint,
				Monto_Servicio bigint
            )
    language plpgsql
as
$$
begin
    return query (
      SELECT comercio.nombre AS Afiliado, count(pedido.idPedido) AS Compras, SUM(producto.precio * producto_pedido.cantidad) AS Monto_Total, SUM(producto.precio * producto_pedido.cantidad) * 0.05 AS Monto_Servicio
FROM (((pedido JOIN producto_pedido  ON pedido.idPedido=producto_pedido.idPedido) 
JOIN Producto ON producto=producto.nombre) 
			   JOIN comercio ON producto.idComercio = comercio.idComercio )
			   WHERE Pedido.finalizado = TRUE  GROUP BY comercio.idComercio
    );
end;
$$;


Select totales3();
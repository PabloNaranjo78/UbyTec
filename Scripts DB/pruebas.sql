CREATE OR REPLACE FUNCTION calcDistancia(
	lat1 float4,
	long1 float4,
	lat2 float4,
	long2 float4
)
RETURNS float4
language plpgsql
AS $$
BEGIN
	return (acos((sin(lat1 * 0.01745329) * sin(lat2 * 0.01745329)) + (cos(lat1 * 0.01745329) * cos(lat2 * 0.01745329) * cos((long1 - long2) * 0.01745329)))) * 57.29577951 * 111.302;
END
$$;

select * from calcDistancia(2.93021,-84.08260,9.89820,-83.69210) as distancia
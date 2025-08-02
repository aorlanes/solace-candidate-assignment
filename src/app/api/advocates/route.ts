import { ilike, or } from "drizzle-orm/expressions";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { sql, count } from "drizzle-orm";

export async function GET(request: any) {
  const url = new URL(request.url);
  const urlParams = url.searchParams;
  const page = urlParams.get("page") ?? 0;
  const search = urlParams.get("search");

  let data = await db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`),
        sql<string>`cast(${advocates.specialties} as text) ilike '%' || ${search} || '%'`,
        sql<string>`cast(${advocates.yearsOfExperience} as text) like '%' || ${search} || '%'`,
        sql<string>`cast(${advocates.phoneNumber} as text) like '%' || ${search} || '%'`
      )
    )
    .limit(10)
    .offset(+page * 10);

  let length = await db
    .select({ count: count() })
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`),
        sql<string>`cast(${advocates.specialties} as text) ilike '%' || ${search} || '%'`,
        sql<string>`cast(${advocates.yearsOfExperience} as text) like '%' || ${search} || '%'`,
        sql<string>`cast(${advocates.phoneNumber} as text) like '%' || ${search} || '%'`
      )
    );

  // const data = advocateData;

  return Response.json({ data: data, count: length[0].count });
}

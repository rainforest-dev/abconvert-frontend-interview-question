import { getApiSpec } from "@/utils/swagger"
import SwaggerUI from "swagger-ui-react"
import 'swagger-ui-react/swagger-ui.css'

export default async function Page() {
    const spec = getApiSpec()
    return <main>
        <SwaggerUI spec={spec} />
    </main>
}
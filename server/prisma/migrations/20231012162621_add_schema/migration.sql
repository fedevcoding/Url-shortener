-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "id" SERIAL NOT NULL,
    "url_id" INTEGER NOT NULL,
    "ip_address" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_url_key" ON "urls"("short_url");

-- CreateIndex
CREATE INDEX "urls_short_url_idx" ON "urls"("short_url");

-- CreateIndex
CREATE INDEX "urls_url_idx" ON "urls"("url");

-- CreateIndex
CREATE INDEX "views_url_id_idx" ON "views"("url_id");
